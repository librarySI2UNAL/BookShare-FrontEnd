import { Component, OnInit, ViewEncapsulation } from "@angular/core";

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

	constructor( private userService: UserService,
		private productService: ProductService,
		private loaderService: LoaderService )
	{
		this.page = 1;
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
	}

	private filter(): void
	{
		if( this.filters.search.length === 0 && this.filters.selection.length === 0 )
			return;
		this.loaderService.show();
		this.page = 1;
		let search: string = this.filters.search.trim();
		let interests: string = "";
		let genres: string = "";
		let columns: string = "";
		for( let i = 0; i < this.filters.selection.length; i++ )
			if( this.filters.selection[i].selected )
				interests += String( this.filters.selection[i].model ) + "+";
			else
				for( let j = 0; j < this.filters.selection[i].children.length; j++ )
					genres += String( this.filters.selection[i].children[j].model ) + "+";
		if( interests.length > 0 )
		{
			interests = interests.substring( 0, interests.length - 1 );
			columns += "interest,";
		}
		if( genres.length > 0 )
		{
			genres = genres.substring( 0, genres.length - 1 );
			columns += "genre,";
		}
		if( search.length > 0 )
		{
			search = search.replace( / /g, "+" );
			if( this.filters.name )
				columns += "name,";
			if( this.filters.author )
				columns += "author,";
		}
		columns = columns.substring( 0, columns.length - 1 );
		this.productService.getFilteredAvailables( this.user.id, search, interests, genres, columns, this.page, this.perPage )
			.subscribe( response =>
			{
				this.totalProducts = response.count;
				this.products = response.data;
				this.loaderService.hide();
			} );
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
				console.log( this.interests );
			} );
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
				this.productService.getAvailables( this.user.id, this.page, this.perPage )
					.subscribe( response =>
					{
						this.totalProducts = response.count;
						this.products = response.data;
						this.loaderService.hide();
					} );
			} );
		this.userService.getSessionStorageUser();
	}
}
