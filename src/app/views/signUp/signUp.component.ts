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
	user: User;
	password: any;
	position: any;

	constructor( private userService: UserService,
		private formBuilder: FormBuilder )
	{
		this.signUpForm = this.createSignUpForm();
		this.user = new User();
		this.password = {
			value: "",
			confirmation: ""
		};
		this.position = {
			latitude: 4.6482836,
			longitude: -74.1256726
		};
	}

	private setPosition( position )
	{
		this.position = position.coords;
	}

	private signUp()
	{
		if( this.signUpForm.invalid )
		{
			return;
		}
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
		this.user.latitude = this.position.latitude;
		this.user.longitude = this.position.longitude;
	}
}