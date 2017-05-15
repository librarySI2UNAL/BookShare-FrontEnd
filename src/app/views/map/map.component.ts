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
    map: any;
    circle: any;
    coords: any;
    zoom: number = 8;
    dist: number = 15;
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
        this.getNearUsers(this.dist);
        this.coords = { lat: this.user.latitude, lng: this.user.longitude }
	}
	
    initMap(event: any) {
        this.map = event;
    }
    
    initCircle(event: any){
        this.circle = event;
        this.map.fitBounds(this.circle.getBounds());
    }
	
	getRadius(distanceInKilometers: number){
	    return distanceInKilometers*1000;
	}
    
    onResize(event) {
        this.map.setCenter(this.coords);
        this.map.fitBounds(this.circle.getBounds());
    }
	
	getCurrentUser(){
	    this.userService.userState
			.subscribe( user => this.user = user );
		this.userService.getSessionStorageUser();
	}
	
	getNearUsers(distance: number){
	    this.userService.getNear(distance).subscribe(
            nearUsers => this.nearUsers = nearUsers,
            error =>  this.errorMessage = <any>error);
	}
	
	nearUserClicked(event: any, user: User){
	    let marker = event;
	    console.log(marker);
	    console.log(user.product.length);
	}
}