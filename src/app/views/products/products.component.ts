import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Product } from "../../classes/product";

import { ProductService } from "../../services/product.service";
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

	constructor( private productService: ProductService )
	{
		this.perPage = 10;
	}

	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.products = true;
		this.productService.availables( 1, this.perPage ).subscribe( response =>
			{
				this.totalProducts = response.count;
				this.products = response.data;
				console.log( this.products );
			} );
	}
}
