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
	selector: "profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProfileComponent implements OnInit
{
	uploader: FileUploader;
	profileForm: FormGroup;
	user: User;
	password: any;
	interests: Array<Interest>;
	submitted: boolean;
	photoURL: string;
	profileImage: string;
	server: string;
	mode: string;
	ownProfile:  boolean;

	@ViewChild( "fileInput" ) fileInput: ElementRef;

	constructor( private userService: UserService,
		private productService: ProductService,
		private loaderService: LoaderService,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.photoURL = `${AppSettings.API_ENDPOINT}/users`;
		this.password = {
			value: "",
			confirmation: ""
		};
		this.profileForm = this.createProfileForm();
		this.submitted = false;
		this.profileImage = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";
		this.server = AppSettings.SERVER;
		this.mode = "view";
		this.ownProfile = false;
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

	private addInterest( index: number ): void
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

	private selectInterest( index: number ): void
	{
		if( this.mode === "view" )
			return;
		this.addInterest( index );
	}

	private showInputFileDialog( fileInput: any ): void
	{
		if( this.mode === "view" )
			return;
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

	private save(): void
	{
		
	}

	private createProfileForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				lastName: ["", [Validators.required]],
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )],
					[this.emailExists()]],
				city: ["", [Validators.required]]
			} );
	}

	private markInterests()
	{
		if( !this.interests || !this.user )
			return;
		for( let i = 0; i < this.user.interests.length; ++i )
			for( let j = 0; j < this.interests.length; ++j )
				if( this.user.interests[i].id === this.interests[j].id )
					this.addInterest( j );
	}

	public ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		this.productService.getInterests()
			.subscribe( interests =>
			{
				this.interests = interests;
				this.markInterests();
			} );
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
				console.log( this.user );
				if( this.user.photo )
					this.profileImage = this.server + this.user.photo.image.url;
				this.markInterests();
			} );
		this.userService.getSessionStorageUser();
	}
}