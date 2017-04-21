import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader, FileUploaderOptions } from "ng2-file-upload";

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
	uploader: FileUploader;
	uploaderOptions: FileUploaderOptions;
	signUpForm: FormGroup;
	user: User;
	password: any;
	position: any;
	interests: Array<Interest>;
	photoURL: string;
	hasPhoto: boolean;
	profile: string;

	constructor( private userService: UserService,
		private productService: ProductService,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.photoURL = "http://localhost:3000/api/v1/users";
		this.uploader = new FileUploader( {
			url: this.photoURL,
			allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
			maxFileSize: 5242880
		} );
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
		this.hasPhoto = false;
		this.profile = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
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

	private setPosition( position ): void
	{
		this.position = position.coords;
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

	private photoOver( e: boolean ): void
	{
		console.log( e );
		this.hasPhoto = e;
	}

	private signUp(): void
	{
		this.uploaderOptions = {
			url: `${this.photoURL}/photos?relation=user`,
			allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
			maxFileSize: 5242880
		};
		this.uploader.setOptions( this.uploaderOptions );
		console.log( this.uploader.queue );
		/*if( this.signUpForm.invalid )
		{
			return;
		}
		this.userService.create( this.user, this.password.value )
			.then( data =>
			{
				this.user = new User( data );
				this.uploaderOptions = {
					url: `${this.photoURL}/${this.user.id}/photos?relation=user`,
					allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
					maxFileSize: 5242880
				};
				this.uploader.setOptions( this.uploaderOptions );
				console.log( this.uploader.queue );
				//this.router.navigate( ["/profile", this.user.id, "view"] );
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
				passwordConfirmation: ["", [Validators.required, Validators.minLength( 8 ), this.mismatch()]]
			} );
	}

	public ngOnInit()
	{
		this.productService.getInterests().subscribe( interests =>
			{
				this.interests = interests;
				console.log( this.interests );
			} );
		this.user.qualification = 0.0;
		this.user.interests = [];
		if( navigator.geolocation )
			navigator.geolocation.getCurrentPosition( this.setPosition.bind( this ) );
		this.user.latitude = this.position.latitude;
		this.user.longitude = this.position.longitude;
	}
}
