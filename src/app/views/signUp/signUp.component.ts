import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";

import { User } from "../../classes/user";
import { Interest } from "../../classes/interest";

import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { PhotoService } from "../../services/photo.service";
import { AppSettings } from "../../app.settings";

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
	signUpForm: FormGroup;
	user: User;
	password: any;
	position: any;
	interests: Array<Interest>;
	submitted: boolean;
	registeredUser: boolean;
	photoURL: string;
	hasPhoto: boolean;
	profileImage: string;
	photosToRemove: Array<number>;

	constructor( private userService: UserService,
		private productService: ProductService,
		private photoService: PhotoService,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.photoURL = `${AppSettings.API_ENDPOINT}/users`;
		this.password = {
			value: "",
			confirmation: ""
		};
		this.signUpForm = this.createSignUpForm();
		this.user = new User( {} );
		this.submitted = false;
		this.registeredUser = false;
		this.hasPhoto = false;
		this.profileImage = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
		this.photosToRemove = [];
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

	private photoOver( e: boolean ): void
	{
		this.hasPhoto = e;
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
				this.uploader = new FileUploader( {
					url: `${this.photoURL}/${this.user.id}/photos`,
					allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
					maxFileSize: 5242880,
					autoUpload: true
				} );
				this.uploader.onCompleteItem = ( fileItem, response, status, headers ) =>
				{
					let data: any;
					if( status === 200 )
					{
						data = JSON.parse( response );
						this.photosToRemove.push( data.photo.id );
						this.profileImage = AppSettings.SERVER + data.photo.image.url;
					}
					else
						console.log( response );
				};
				this.registeredUser = true;
			} )
			.catch( error =>
			{
				console.log( error );
			} );
	}

	private skip(): void
	{
		if( this.photosToRemove.length > 0 )
			this.photoService.deleteArray( this.photosToRemove, "users" )
				.then( response =>
				{

				} )
				.catch( response =>
				{

				} );
		this.router.navigate( ["/profile"] );
	}

	private updateUser(): void
	{
		if( this.photosToRemove.length > 1 )
		{
			this.photosToRemove = this.photosToRemove.slice( 0, this.photosToRemove.length - 1 )
			this.photoService.deleteArray( this.photosToRemove, "users" )
				.then( response =>
				{

				} )
				.catch( response =>
				{

				} );
		}
		if( this.user.interests.length > 0 )
			this.userService.update( this.user )
				.then( response =>
				{
					this.router.navigate( ["/profile"] );
				} )
				.catch( response =>
				{

				} );
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
		this.productService.getInterests()
			.subscribe( interests =>
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