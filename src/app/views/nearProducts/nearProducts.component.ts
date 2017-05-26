import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

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
	myDist: number = AppSettings.MAPDIST;
	
	constructor(private router: Router)
	{
		
	}
	
	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.nearProducts = true;
	}
	
	getDist(){
		return AppSettings.MAPDIST;
	}
	
	newDist(updatedDist: any){
		this.myDist = updatedDist;
	}
	
	mouseReleased(){
		AppSettings.MAPDIST = this.myDist;
	}
}