import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component(
{
	selector: "log-in",
	templateUrl: "./logIn.component.html",
	styleUrls: ["./logIn.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class LogInComponent implements OnInit
{
	loginForm: FormGroup;
	email:any;
	password:any;
	
	constructor(private formBuilder: FormBuilder)
	{
		this.loginForm = this.createLoginForm();
	}

	ngOnInit()
	{

	}
	private createLoginForm(): FormGroup
	{
		return this.formBuilder.group(
			{	email: ["email@gmail.com", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
				password: ["contraseña", Validators.required ]

			} );
	}


}
