import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./models/user";

import { UserService } from "./services/user.service";
import { AppSettings } from "./app.settings";

@Component(
{
	selector: "book-share",
	templateUrl: "./app.component.html"
} )

export class AppComponent implements OnInit
{
	user: User;
	actives: any;
	credentials: any;
	logInForm: FormGroup;
	showLogIn: boolean;
	loading: boolean;
	submitted: boolean;
	logInError: boolean;
	logInErrorMessage: string;

	constructor( private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router )
	{
		this.user = new User( {} );
		this.credentials = {
			email: "",
			password: ""
		};
		this.logInForm = this.createLogInForm();
		this.showLogIn = false;
		this.loading = false;
		this.logInError = false;
	}

	private emailDoesNotExist(): ValidatorFn
	{
		return ( control: AbstractControl ): { [key: string]: any } =>
			{
				return new Promise( resolve =>
				{
					let input: string = control.value;
					this.userService.existsWithEmail( input )
						.then( data =>
						{
							if( data.exists )
								resolve( null );
							else
								resolve( { emailDoesNotExist: true } );
						} )
						.catch( () =>
						{
							resolve( null );
						} );
				} );
			}
	}

	private createLogInForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )],
					[this.emailDoesNotExist()]],
				password: ["", [Validators.required, Validators.minLength( 8 )]]
			} );
	}

	private showLogInModal( value: boolean ): void
	{
		if( !value )
		{
			this.credentials = {
				email: "",
				password: ""
			};
			this.logInForm.markAsPristine();
			this.logInForm.markAsUntouched();
		}
		this.showLogIn = value;
		this.submitted = false;
	}

	private logIn(): void
	{
		this.submitted = true;
		if( this.logInForm.invalid )
			return;
		this.loading = true;
		this.userService.logIn( this.credentials )
			.then( user =>
			{
				this.userService.setUser( new User( user ), true );
				this.logInError = false;
				this.loading = false;
				this.showLogInModal( false );
			} )
			.catch( response =>
			{
				this.logInErrorMessage = JSON.parse( response._body ).message;
				this.logInError = true;
				this.loading = false;
			} );
	}

	private logOut(): void
	{
		this.userService.logOut();
		this.router.navigate( ["/home"] );
	}

	ngOnInit()
	{
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
			} );
		this.userService.getSessionStorageUser();
		this.actives = AppSettings.ACTIVES;
	}
}