import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "./services/user.service";
import { AppSettings } from "./app.settings";

@Component(
{
	selector: "book-share",
	templateUrl: "./app.component.html"
} )

export class AppComponent implements OnInit
{
	actives: any;
	credentials: any;
	logInForm: FormGroup;
	showLogIn: boolean;
	loading: boolean;
	submitted: boolean;

	constructor( private userService: UserService,
		private formBuilder: FormBuilder )
	{
		this.credentials = {
			email: "",
			password: ""
		};
		this.logInForm = this.createLogInForm();
		this.showLogIn = false;
		this.loading = false;
	}

	private createLogInForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
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
		setTimeout( () =>
		{
	    	this.loading = false;
	    }, 5000 );
	}

	ngOnInit()
	{
		this.actives = AppSettings.ACTIVES;
	}
}