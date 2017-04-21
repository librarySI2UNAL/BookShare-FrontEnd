import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../classes/product";
import { Genre } from "../../classes/genre";

import { ProductService } from "../../services/product.service";

@Component(
{
	selector: "product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProductComponent implements OnInit
{
	productForm: FormGroup;
	mode: string;
	product: Product;
	covers: any;
	statuses: any;
	genres: Array<Genre>;
	typeValues: any;
	typeTexts: any;
	types: Array<string>;

	constructor( private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService )
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
				description: ["", [Validators.maxLength( 1000 )]],
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
		if( this.productForm.invalid )
		{
			return;
		}
		if( this.mode === "create" )
			this.productService.create( this.product )
				.then( data =>
				{
					console.log( data );
					
					this.router.navigate( ["/products"] );
				} )
				.catch( error =>
				{
					console.log( error );
				} );
		else
			this.productService.update( this.product.id, this.product )
				.then( data =>
				{
					console.log( data );
					
					//this.router.navigate( ["/products"] );
				} )
				.catch( error =>
				{
					console.log( error );
				} );
	}

	ngOnInit()
	{
		this.route.params.subscribe( params =>
			{
				if( Object.keys( params ).length === 0 )
				{
					this.mode = "create";
					this.product = new Product( {} );
					this.product.available = true;
					this.product.special = true;
				}
				else if( params["mode"] === "view" || params["mode"] === "edit" )
				{
					let id: number = +params["id"];
					if( !id )
						this.router.navigate( ["/home"] );
					this.mode = params["mode"];

					this.productService.get( id )
						.then( data =>
						{
							this.product = new Product( data );
							console.log( this.product );
						} )
						.catch( error =>
						{
							console.log( error );
						} );
				}
				else
					this.router.navigate( ["/home"] );

				this.productService.getGenres().subscribe( response =>
					{
						this.genres = response;
					} );
			} );
	}
}