import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

import { User } from "../../models/user";
import { Product } from "../../models/product";

import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: 'map',
	providers: [ UserService, ProductService ],
	templateUrl: './map.component.html',
	styleUrls: ['map.component.scss'],
	encapsulation: ViewEncapsulation.None
} )

export class MapComponent implements OnInit{
	map: any;
	circle: any;
	coords: any;
	zoom: number = 8;
	scrollmap: boolean = false;
	user: User;
	nearUsers: User[];
	showUserProducts: boolean = false;
	errorMessage: string;
	userProducts: Product[];
	loading: boolean = true;

	constructor( private userService: UserService,
		private productService: ProductService,
		private router: Router )
	{
	}

	ngOnInit()
	{
		this.getCurrentUser();
	}
	
	initMap(event: any) {
		this.map = event;
	}
	
	initCircle(event: any){
		this.circle = event;
		this.map.fitBounds(this.circle.getBounds());
		google.maps.event.addListener(this.circle,'radius_changed',() => {
			this.getNearUsers();
            console.log("qwertyuiop");
        })
	}
	
	getRadius(){
		return AppSettings.MAPDIST*1000;
	}
	
	onResize(event) {
		this.map.setCenter(this.coords);
		this.map.fitBounds(this.circle.getBounds());
	}
	
	private getCurrentUser(): void
	{
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
				this.coords = { lat: this.user.latitude, lng: this.user.longitude };
				this.getNearUsers();
			} );
		this.userService.getSessionStorageUser();
	}
	
	private getNearUsers(): void
	{
		this.userService.getNear( this.user.id, AppSettings.MAPDIST )
			.subscribe( users =>
			{
				this.nearUsers = users;
			}, error => this.errorMessage = <any>error );
	}

	private getAllProductsForUser( userId: number ): void
	{
		this.productService.getByUser( userId, true )
			.subscribe( userProducts =>
			{
				this.userProducts = [];
				let products: Array<any> = userProducts;
				for( let i = 0; i < products.length; ++i )
					this.userProducts.push( new Product( products[i] ) );
				console.log(this.userProducts);
				this.loading = false;
			}, error => this.errorMessage = <any>error );
	}

	nearUserClicked(event: any, selectedUser: User){
		let marker = event;
		this.getAllProductsForUser(selectedUser.id);
		this.loading = true;
		this.showUserProductsModal(true);
	}
	
	showUserProductsModal( state: boolean ): void
	{
		this.showUserProducts = state;
	}
	
	goToProductDetail(id : number) {
	  this.router.navigate(['/product', id]);
	}
}