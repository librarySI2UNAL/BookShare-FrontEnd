import { Component, OnInit } from "@angular/core";

import { AppSettings } from "./app.settings";

@Component(
{
	selector: "book-share",
	templateUrl: "./app.component.html"
} )

export class AppComponent implements OnInit
{
	actives: any;

	ngOnInit()
	{
		this.actives = AppSettings.ACTIVES;
	}
}