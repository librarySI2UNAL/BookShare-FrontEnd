import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";

import { User } from "../../models/user";
import { Interest } from "../../models/interest";

import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { LoaderService } from "../../services/loader.service";
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
	profileImage: string;
	server: string;
	positionError: boolean = false;

	@ViewChild( "fileInput" ) fileInput: ElementRef;

	constructor( private userService: UserService,
		private productService: ProductService,
		private loaderService: LoaderService,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.user = new User( {} );
		this.photoURL = `${AppSettings.API_ENDPOINT}/users`;
		this.password = {
			value: "",
			confirmation: ""
		};
		this.signUpForm = this.createSignUpForm();
		this.submitted = false;
		this.registeredUser = false;
		this.server = AppSettings.SERVER;
		this.profileImage = this.server + "/images/Avatar.jpg";
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

	private showInputFileDialog( fileInput: any ): void
	{
		this.fileInput.nativeElement.click();
	}

	private updatePhoto(): void
	{
		let fileReader: FileReader = new FileReader();
		
		fileReader.onload = this.completeOnLoadPhoto.bind( this );
		fileReader.readAsDataURL( this.uploader.queue[this.uploader.queue.length - 1]._file );
	}

	private completeOnLoadPhoto( e: any ): void
	{
		this.profileImage = e.target.result;
	}

	private signUp(): void
	{
		this.submitted = true;
		if( this.signUpForm.invalid )
			return;

		this.loaderService.show();
		this.userService.create( this.user, this.password.value )
			.then( data =>
			{
				this.user = new User( data );
				this.userService.setUser( this.user, true );
				
				this.uploader = new FileUploader( {
					url: `${this.photoURL}/${this.user.id}/photos`,
					allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
					maxFileSize: 5242880,
					authToken: this.user.token
				} );
				this.uploader.onCompleteItem = ( item, response, status, headers ) =>
				{
					this.userService.update( this.user )
						.then( userObject =>
						{
							let data: any = {};
							data.token = this.user.token;
							data.data = userObject;
							this.userService.setUser( new User( data ), true );
							this.loaderService.hide();
							this.router.navigate( ["/profile"] );
						} )
						.catch( response =>
						{
							this.loaderService.hide();
							console.log( response );
							this.router.navigate( ["/profile"] );
						} );
				};
				
				AppSettings.HEADERS.set( "Authorization", this.user.token );
				this.registeredUser = true;
				this.loaderService.hide();
			} )
			.catch( error =>
			{
				console.log( error );
				this.loaderService.hide();
			} );
	}

	private updateUser(): void
	{
		if( this.uploader.queue.length > 0 )
		{
			this.loaderService.show();
			this.uploader.queue[this.uploader.queue.length - 1].upload();
		}
		else if( this.user.interests.length > 0 )
		{
			this.loaderService.show();
			this.userService.update( this.user )
				.then( userObject =>
				{
					let data: any = {};
					data.token = this.user.token;
					data.data = userObject;
					this.userService.setUser( new User( data ), true );
					this.loaderService.hide();
					this.router.navigate( ["/profile"] );
				} )
				.catch( response =>
				{
					this.loaderService.hide();
					console.log( response );
				} );
		}
		else
			this.router.navigate( ["/profile"] );
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
	
	private handleLocationError (error:any): any { 
		if (error.code == error.PERMISSION_DENIED){
			console.log("you denied me :-(");
			this.positionError = true;
		}
	}

	public ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.signUp = true;
		this.productService.getInterests()
			.subscribe( interests =>
			{
				this.interests = interests;
			} );
		this.user.qualification = 0.0;
		this.user.interests = [];
		if( navigator.geolocation )
			navigator.geolocation.getCurrentPosition( this.setPosition.bind( this ), this.handleLocationError(this));
		console.log(this.positionError);
		if( this.positionError )
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