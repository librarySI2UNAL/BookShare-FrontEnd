import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../classes/user";
import { UserService } from "../../services/user.service";

@Component(
{
	selector: "profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProfileComponent {
	profileForm: FormGroup;
	user: User;
	mode: string;
	password: any;
	position: any;

	constructor( private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder )
	{
		this.password = {
			value: "",
			confirmation: ""
		};
		this.profileForm = this.createProfileForm();
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

	private profile()
	{
		if( this.profileForm.invalid )
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

	private createProfileForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				lastName: ["", [Validators.required]],
				email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]]
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

		this.route.params.subscribe( params =>
		{
			if( params["mode"] === "view" || params["mode"] === "edit" )
			{
				let id: number = +params["id"];
				if( !id )
					this.router.navigate( ["/home"] );
				this.mode = params["mode"];

				this.userService.get( id )
					.then( data =>
					{
						this.user = new User( data );
						console.log( this.user );
					} )
					.catch( error =>
					{
						console.log( error );
					} );
			}
			else
				this.router.navigate( ["/home"] );
		} );
	}
}
