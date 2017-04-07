import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

import { ProductService } from "../services/product.service";
import { Product } from "../classes/product";

@Component(
{
	selector: "book-share",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
} )

export class AppComponent implements OnInit
{
	products: Product[];
	errorMessage: string;

	constructor( private productService: ProductService )
	{}

	ngOnInit(): void
	{
		this.productService.availableProducts( 1, 10 ).subscribe( 
			products => this.products = products,
			error =>  this.errorMessage = <any>error );
	}
}
  
