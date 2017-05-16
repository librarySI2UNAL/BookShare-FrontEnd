import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Product } from "../../models/product";
import { User } from "../../models/user";

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
	totalProducts: number;
	user: User;

	constructor( private userService: UserService,
		private productService: ProductService,
		private loaderService: LoaderService )
	{
		this.perPage = 10;
		this.products = [];
	}

	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.products = true;
		
		this.loaderService.show();
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
						console.log( this.products );
						this.loaderService.hide();
					} );
			} );
		this.userService.getSessionStorageUser();
	}
}
