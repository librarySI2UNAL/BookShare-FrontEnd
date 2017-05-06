import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../models/product";
import { Genre } from "../../models/genre";
import { User } from "../../models/user";

import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { LoaderService } from "../../services/loader.service";

@Component(
{
	selector: "product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProductComponent implements OnInit
{
	user: User;
	productForm: FormGroup;
	mode: string;
	product: Product;
	covers: any;
	statuses: any;
	genres: Array<Genre>;
	typeValues: any;
	typeTexts: any;
	types: Array<string>;
	submitted: boolean;
	createdProduct: boolean;

	constructor( private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private userService: UserService,
		private loaderService: LoaderService )
	{
		this.product = new Product( {} );
		this.genres = [];
		this.productForm = this.createProductForm();
		this.covers = ["Blanda", "Dura"];

		this.statuses = ["Terrible", "Malo", "Regular", "Bueno", "Excelente"];

		this.types = ["Libro", "Colección"];
		this.typeValues = {
			Libro: "book",
			Colección: "collection"
		};
		this.typeTexts = {
			book: "Libro",
			collection: "Colección"
		};
		this.submitted = false;
		this.createdProduct = false;
	}

	private maxValue( max: number ): ValidatorFn
	{
		return ( control: AbstractControl ): { [key: string]: any } =>
			{
				let input: number = control.value;
				let isValid: boolean = input > max;
				if( isValid ) 
					return { "maxValue": { max } }
				else
					return null;
			};
	}

	private createProductForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				cover: [null, [Validators.required]],
				status: [null, [Validators.required]],
				author: ["", [Validators.required]],
				genre: [null, [Validators.required]],
				yearOfPublication: [null, [Validators.required, this.maxValue( new Date().getFullYear() )]],
				editorial: ["", [Validators.required]],
				type: ["", [Validators.required]],
				code: ["", [Validators.required]],
				codeType: ["", [Validators.required]],
				value: [null, [Validators.required]]
			} );
	}

	private save(): void
	{
		this.submitted = true;
		if( this.productForm.invalid )
			return;
		this.loaderService.show();
		if( this.mode === "create" )
			this.productService.create( this.user.id, this.product )
				.then( product =>
				{
					this.product = new Product( product );
					this.createdProduct = true;
					this.loaderService.hide();
				} )
				.catch( error =>
				{
					this.loaderService.hide();
					console.log( error );
				} );
		else
			this.productService.update( this.user.id, this.product.id, this.product )
				.then( product =>
				{
					this.product = new Product( product );
					this.loaderService.hide();
					this.router.navigate( ["/home"] );
					//this.router.navigate( ["/profile"] );
				} )
				.catch( error =>
				{
					this.loaderService.hide();
					console.log( error );
				} );
	}

	ngOnInit()
	{
		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
			} );
		this.userService.getSessionStorageUser();
		this.route.params.subscribe( params =>
			{
				if( Object.keys( params ).length > 1 )
					this.router.navigate( ["/home"] );
				else if( Object.keys( params ).length === 0 )
				{
					this.mode = "create";
					this.product = new Product( {} );
					this.product.available = true;
					this.product.special = true;
				}
				else
				{
					let id: number = +params["id"];
					if( !id )
						this.router.navigate( ["/home"] );
					this.mode = "view";

					this.productService.get( id )
						.then( product =>
						{
							this.product = new Product( product );
						} )
						.catch( error =>
						{
							console.log( error );
						} );
				}

				this.productService.getGenres().subscribe( response =>
					{
						this.genres = response;
						this.product.productItem.genre = this.genres[0];
					} );
			} );
	}
}