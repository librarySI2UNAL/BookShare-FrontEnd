import { Component, OnInit } from "@angular/core";

import { User } from "../../classes/user";
import { UserService } from "../../services/user.service";

@Component(
{
	selector: "app-registry",
	templateUrl: "./registry.component.html",
	styleUrls: ["./registry.component.css"]
} )

export class RegistryComponent implements OnInit
{
	user: User = new User();
	password: any = {
		value: "",
		confirm: ""
	};

	constructor(){}

	setPosition( position )
	{
		let coordinates: any = position.coords;
		this.user.latitude = coordinates.latitude;
		this.user.longitude = coordinates.longitude;
		console.log( this.user );
	}

	register()
	{
		console.log( this.user );
		console.log( this.password );
	}

	ngOnInit()
	{
		this.user.interests = [];
		if( navigator.geolocation )
			navigator.geolocation.getCurrentPosition( this.setPosition.bind( this ) );
		else
		{
			this.user.latitude = 4.6482836;
			this.user.longitude = -74.1256726;
		}
	}
}