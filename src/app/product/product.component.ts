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
	genres: Array<Genre>

	constructor( private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService )
	{
		this.genres = [];
		this.productForm = this.createProductForm();
		this.covers = [
		{
			value: 1,
			name: "Blanda"
		},
		{
			value: 2,
			name: "Dura"
		}];

		this.statuses = [
		{
			value: 1,
			name: "Terrible"
		},
		{
			value: 2,
			name: "Malo"
		},
		{
			value: 3,
			name: "Regular"
		},
		{
			value: 4,
			name: "Bueno"
		},
		{
			value: 5,
			name: "Excelente"
		}];

		let genre: Genre = new Genre();
		genre.id = 1;
		genre.name = "Drama";
		this.genres.push( genre );
		genre = new Genre();
		genre.id = 2;
		genre.name = "Novela";
		this.genres.push( genre );
	}

	private maxValue( max: Number ): ValidatorFn
	{
		return ( control: AbstractControl ): { [key: string]: any } =>
			{
				let input: number = control.value,
				isValid = input > max;
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
	}

	ngOnInit()
	{
		this.route.params.subscribe( params =>
			{
				if( Object.keys( params ).length === 0 )
				{
					this.mode = "create";
					this.product = new Product( {} );
				}
				else if( params["mode"] === "view" || params["mode"] === "edit" )
				{
					let id: number = +params["id"];
					if( !id )
						this.router.navigate( ["/home"] );
					this.mode = params["mode"];

					/*this.productService.get( id )
						.then( data =>
						{
							this.product = new Product( data );
						} )
						.catch( error =>
						{
							console.log( error );
						} );*/
				}
				else
					this.router.navigate( ["/home"] );
			} );
	}
}