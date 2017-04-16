import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../../classes/product";

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

	constructor( private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService )
	{
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
				genre: ["", [Validators.required]],
				editorial: ["", [Validators.required]],
				yearOfPublication: [null, [Validators.required, this.maxValue( 2017 )]],
				code: ["", [Validators.required]],
				codeType: ["", [Validators.required]],
				special: [null, [Validators.required]],
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