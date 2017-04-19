import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { ProductService } from "../../services/product.service";

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

	constructor( private productService: ProductService )
	{
		this.perPage = 10;
	}

	ngOnInit()
	{
		this.productService.availables( 1, this.perPage ).subscribe( response =>
			{
				console.log( response );
			} );
	}
}