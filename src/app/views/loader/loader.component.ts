import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { LoaderService } from "../../services/loader.service";

@Component(
{
	selector: "loader",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class LoaderComponent implements OnInit
{
	visible: boolean;

	constructor( private loaderService: LoaderService )
	{
		
	}

	ngOnInit()
	{
		this.loaderService.loaderState
			.subscribe( ( state: LoaderState ) =>
			{
				this.visible = state.show;
			} );
	}
}

export interface LoaderState
{
	show: boolean;
}