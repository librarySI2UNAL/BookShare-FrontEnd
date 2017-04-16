import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../classes/product";

import { ProductService } from "../../services/product.service";

@Component(
{
	selector: "product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProductComponent implements OnInit
{
	mode: string;
	product: Product;

	constructor( private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService )
	{
		
	}

	ngOnInit()
	{
		this.route.params.subscribe( params =>
			{
				if( Object.keys( params ).length === 0 )
				{
					this.mode = "create";
					this.product = new Product( {} );
				}
				else if( params["mode"] === "view" || params["mode"] === "edit" )
				{
					let id: number = +params["id"];
					if( !id )
						this.router.navigate( ["/home"] );
					this.mode = params["mode"];

					/*this.productService.get( id )
						.then( data =>
						{
							this.product = new Product( data );
						} )
						.catch( error =>
						{
							console.log( error );
						} );*/
				}
				else
					this.router.navigate( ["/home"] );
			} );
	}
}