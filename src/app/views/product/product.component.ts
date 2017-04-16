import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../classes/product";

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

	constructor( private route: ActivatedRoute, private router: Router )
	{

	}

	ngOnInit()
	{
		this.route.params.subscribe( params =>
			{
				if( Object.keys( params ).length === 0 )
					this.mode = "create";
				else if( params["mode"] === "view" || params["mode"] === "edit" )
					this.mode = params["mode"];
				else
					this.router.navigate( ["/home"] );
			} );
	}
}