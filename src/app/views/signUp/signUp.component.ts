import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { User } from "../../classes/user";
import { UserService } from "../../services/user.service";

@Component(
{
	selector: "sign-up",
	templateUrl: "./signUp.component.html",
	styleUrls: ["./signUp.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class SignUpComponent implements OnInit
{
	signUpForm: FormGroup;
	user: User = new User();
	password: any = {
		value: "",
		confirmation: ""
	};

	constructor( private userService: UserService,
		private formBuilder: FormBuilder )
	{
		this.signUpForm = this.createSignUpForm();
	}

	private setPosition( position )
	{
		let coordinates: any = position.coords;
		this.user.latitude = coordinates.latitude;
		this.user.longitude = coordinates.longitude;
	}

	private register()
	{
		console.log( this.user );
		/*this.userService.create( this.user, this.password.value )
			.then( data =>
			{ 
				console.log( data );
			} )
			.catch( error =>
			{ 
				console.log( error );
			} );*/
	}

	private createSignUpForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				lastName: ["", [Validators.required]],
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
				password: ["", [Validators.required, Validators.minLength( 8 )]],
				passwordConfirmation: ["", [Validators.required, Validators.minLength( 8 )]]
			} );
	}

	public ngOnInit()
	{
		this.user.qualification = 0.0;
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