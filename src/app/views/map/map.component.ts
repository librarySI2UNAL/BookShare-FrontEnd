import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { User } from "../../models/user";
import { AppSettings } from "../../app.settings";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['map.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit{
    latitude: number = 41.8708;
    longitude: number = -87.6505;
    coords: any = { lat: this.latitude, lng: this.longitude };
    zoom: number = 12;
    scrollmap: boolean = false;
    user: User;

	constructor()
	{
	}

	ngOnInit()
	{

	}
}