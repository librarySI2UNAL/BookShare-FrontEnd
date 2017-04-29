import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component(
{
	selector: "near-products",
	templateUrl: "./nearProducts.component.html",
	styleUrls: ["./nearProducts.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class NearProductsComponent implements OnInit
{
	lat: number =  4.7524465035945;
	lng: number = -74.08623508554138;

	constructor()
	{
		
	}

	ngOnInit()
	{

	}
}