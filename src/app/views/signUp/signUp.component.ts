import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../../classes/user";
import { Interest } from "../../classes/interest";

import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";

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
	interests: Array<Interest>;
	submitted: boolean;
	registeredUser: boolean;

	constructor( private userService: UserService,
		private productService: ProductService,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.password = {
			value: "",
			confirmation: ""
		};
		this.signUpForm = this.createSignUpForm();
		this.user = new User( {} );
		this.submitted = false;
		this.registeredUser = false;
	}

	private mismatch(): ValidatorFn
	{
		return ( control: AbstractControl ): { [key: string]: any } =>
			{
				let input: string = control.value;
				let password: string = this.password.value;
				let isValid: boolean = password !== input;
				if( isValid ) 
					return { mismatch: { password } }
				else
					return null;
			};
	}

	private emailExists(): ValidatorFn
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
								resolve( { emailExists: true } );
							else
								resolve( null );
						} )
						.catch( response =>
						{
							resolve( null );
						} );
				} );
			}
	}

	private setPosition( position ): void
	{
		this.position = position.coords;
		this.user.latitude = this.position.latitude;
		this.user.longitude = this.position.longitude;
	}

	private selectInterest( index: number ): void
	{
		let exists: boolean = false;
		for( let i = 0; i < this.user.interests.length; ++i )
			if( this.user.interests[i].id === this.interests[index].id )
			{
				this.user.interests.splice( i, 1 );
				exists = true;
				break;
			}
		if( !exists )
			this.user.interests.push( this.interests[index] );
	}

	private signUp(): void
	{
		this.submitted = true;
		if( this.signUpForm.invalid )
			return;
		this.userService.create( this.user, this.password.value )
			.then( data =>
			{
				this.user = new User( data );
				this.registeredUser = true;
			} )
			.catch( error =>
			{
				console.log( error );
			} );
	}

	private skip(): void
	{
		this.router.navigate( ["/profile", this.user.id, "view"] );
	}

	private updateUser(): void
	{
		
	}

	private createSignUpForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				lastName: ["", [Validators.required]],
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )], 
					[this.emailExists()]],
				password: ["", [Validators.required, Validators.minLength( 8 )]],
				passwordConfirmation: ["", [Validators.required, Validators.minLength( 8 ), this.mismatch()]]
			} );
	}

	public ngOnInit()
	{
		this.productService.getInterests().subscribe( interests =>
		{
			this.interests = interests;
		} );
		this.user.qualification = 0.0;
		this.user.interests = [];
		if( navigator.geolocation )
			navigator.geolocation.getCurrentPosition( this.setPosition.bind( this ) );
		else
		{
			this.position = {
				latitude: 4.6482836,
				longitude: -74.1256726
			};
			this.user.latitude = this.position.latitude;
			this.user.longitude = this.position.longitude;
		}
	}
}