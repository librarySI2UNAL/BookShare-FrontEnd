import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { AppSettings } from "../../app.settings";

@Component(
{
	selector: "near-products",
	templateUrl: "./nearProducts.component.html",
	styleUrls: ["./nearProducts.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class NearProductsComponent implements OnInit
{
	constructor()
	{
		
	}
	
	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.nearProducts = true;
	}
}