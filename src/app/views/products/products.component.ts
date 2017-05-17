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
		let search: string = this.filters.search;
		let interests: string = "";
		let genres: string = "";
		for( let i = 0; i < this.filters.selection.length; i++ )
			if( this.filters.selection[i].selected )
				interests += String( this.filters.selection[i].model ) + ",";
			else
				for( let j = 0; j < this.filters.selection[i].children.length; j++ )
					genres += String( this.filters.selection[i].children[j].model ) + ",";
		if( interests.length > 0 )
			interests = interests.substring( 0, interests.length - 1 );
		if( genres.length > 0 )
			genres = genres.substring( 0, genres.length - 1 );
		if( search.length > 0 )
			search = search.replace( / /g, "+" );
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
				this.productService.getAvailables( this.user.id, 1, this.perPage )
					.subscribe( response =>
					{
						this.totalProducts = response.count;
						let products: Array<any> = response.data;
						for( let i = 0; i < products.length; ++i )
							this.products.push( new Product( products[i] ) );
						this.loaderService.hide();
					} );
			} );
		this.userService.getSessionStorageUser();
	}
}
