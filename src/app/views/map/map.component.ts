import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { User } from "../../models/user";
import { AppSettings } from "../../app.settings";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'map',
    providers: [ UserService ],
    templateUrl: './map.component.html',
    styleUrls: ['map.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit{
    latitude: number = 41.8708;
    longitude: number = -87.6505;
    coords: any = { lat: this.latitude, lng: this.longitude };
    zoom: number = 12;
    dist: number = 500;
    radius: number = this.dist*1000;
    scrollmap: boolean = false;
    user: User;
    nearUsers: User[];
    errorMessage: string;

	constructor(private userService: UserService)
	{
	}

	ngOnInit()
	{
        this.getCurrentUser();
        this.getNearUsers();
	}
	
	getCurrentUser(){
	    this.userService.userState
			.subscribe( user => this.user = user );
		this.userService.getSessionStorageUser();
	}
	
	getNearUsers(){
	    this.userService.getNear(this.dist).subscribe(
            nearUsers => this.nearUsers = nearUsers,
            error =>  this.errorMessage = <any>error);
	}
}