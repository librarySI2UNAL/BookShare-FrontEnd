import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../models/product";
import { User } from "../../models/user";
import { Interest } from "../../models/interest";
import { Genre } from "../../models/genre";

import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { LoaderService } from "../../services/loader.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: "products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProductsComponent implements OnInit
{
	page: number;
	perPage: number;
	products: Array<Product>;
	interests: Array<Interest>;
	totalProducts: number;
	user: User;
	filters: any;
	selectedInterest: Interest;
	selectedGenre: Genre;
	selectedInterestAux: any;
	server: string;
	productsNotFound: boolean;
	genericBook: string;

	constructor( private userService: UserService,
		private productService: ProductService,
		private loaderService: LoaderService,
		private router: Router,
		private route: ActivatedRoute )
	{
		this.page = -1;
		this.perPage = 10;
		this.products = [];
		this.interests = [];
		this.filters = {
			search: "",
			name: false,
			author: false,
			selection: []
		};
		this.selectedInterest = new Interest();
		this.selectedGenre = new Genre();
		this.selectedInterestAux = {};
		this.server = AppSettings.SERVER;
		this.productsNotFound = false;
		this.genericBook = "/images/book_cover.jpg";
	}

	private pages(): Array<number>
	{
		let array: Array<number> = [];
		if( !this.totalProducts )
			return array;

		let pages: number = Math.ceil( this.totalProducts / this.perPage );
		for( let i = 0; i < pages; i++ )
			array.push( i + 1 );
		return array;
	}

	private changePage( page: number ): void
	{
		if( this.page === page )
			return;
		this.loaderService.show();
		this.page = page;
		this.productService.getAvailables( this.user.id, this.page, this.perPage )
			.subscribe( response =>
			{
				this.totalProducts = response.count;
				this.products = [];
				let products: Array<any> = response.data;
				for( let i = 0; i < products.length; ++i )
					this.products.push( new Product( products[i] ) );
				this.loaderService.hide();
			} );
	}

	private reset(): void
	{
		this.page = -1;
		this.changePage( 1 );
	}

	private filter(): void
	{
		if( this.filters.search.length === 0 && this.filters.selection.length === 0 )
			return;
		this.loaderService.show();
		this.page = 1;
		let search: string = this.filters.search.trim();
		let genres: string = "";
		let columns: string = "";
		let q: string = "";
		for( let i = 0; i < this.filters.selection.length; i++ )
			for( let j = 0; j < this.filters.selection[i].children.length; j++ )
					genres += String( this.filters.selection[i].children[j].model ) + "+";
		if( genres.length > 0 )
		{
			genres = genres.substring( 0, genres.length - 1 );
			columns += "genre,";
			q += genres + ",";
		}
		if( search.length > 0 && ( this.filters.name || this.filters.author ) )
		{
			search = search.replace( / /g, "+" );
			if( this.filters.name )
				columns += "name,";
			if( this.filters.author )
				columns += "author,";
			q += search;
		}
		else
			q = q.substring( 0, q.length - 1 );
		columns = columns.substring( 0, columns.length - 1 );

		this.productService.getFilteredAvailables( this.user.id, q, columns, this.page, this.perPage )
			.subscribe( response =>
			{
				this.totalProducts = response.count;
				this.products = [];
				let products: Array<any> = response.data;
				for( let i = 0; i < products.length; ++i )
					this.products.push( new Product( products[i] ) );
				if( this.products.length === 0 )
					this.productsNotFound = true;
				else
					this.productsNotFound = false;
				this.loaderService.hide();
			} );
	}

	private toString( id: number ): string
	{
		return String( id );
	}

	private redirectToProduct( id: number ): void
	{
		this.router.navigate( ["/product", id] );
	}

	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.products = true;
		
		this.loaderService.show();
		this.productService.getInterests()
			.subscribe( interests =>
			{
				this.interests = interests;
				/*for( let i = 0; i < this.interests.length; i++ )
					this.selectedInterestAux[String( this.interests[i].id )] = false;
				this.route.params
					.subscribe( data =>
					{
						if( data.interest )
						{
							this.selectedInterestAux[data.interest] = true;
							this.filter();
						}
					} );*/
			} );
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
				this.changePage( 1 );
			} );
		this.userService.getSessionStorageUser();
	}
}
