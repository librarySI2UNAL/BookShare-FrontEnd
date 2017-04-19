import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

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
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.password = {
			value: "",
			confirmation: ""
		};
		this.signUpForm = this.createSignUpForm();
		this.user = new User( {} );
		this.position = {
			latitude: 4.6482836,
			longitude: -74.1256726
		};
	}

	private mismatch(): ValidatorFn
	{
		return ( control: AbstractControl ): { [key: string]: any } =>
			{
				let input: string = control.value;
				let password: string = this.password.value;
				let isValid: boolean = this.password.value !== input;
				if( isValid ) 
					return { "mismatch": { password } }
				else
					return null;
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
		this.userService.create( this.user, this.password.value )
			.then( data =>
			{
				this.user = new User( data );
				this.router.navigate( ["/home"] );
			} )
			.catch( error =>
			{
				console.log( error );
			} );
	}

	private createSignUpForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				lastName: ["", [Validators.required]],
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
				password: ["", [Validators.required, Validators.minLength( 8 )]],
				passwordConfirmation: ["", [Validators.required, Validators.minLength( 8 ), this.mismatch()]]
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
