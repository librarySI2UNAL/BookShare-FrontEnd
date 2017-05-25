import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader, FileItem } from "ng2-file-upload";

import { Product } from "../../models/product";
import { Genre } from "../../models/genre";
import { User } from "../../models/user";

import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { LoaderService } from "../../services/loader.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: "product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class ProductComponent implements OnInit
{
	uploader: FileUploader;
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
	photoURL: string;
	productImages: Array<string>;
	server: string;
	ownProduct: boolean;
	profileImage: string;
	avatarImage: string;
	loadingComment: boolean;
	comment: string;
	id: number;
	showUserInformation: boolean;
	showDeleteConfirmation: boolean;
	deleteLoading: boolean;

	@ViewChild( "fileInput" ) fileInput: ElementRef;

	constructor( private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private userService: UserService,
		private loaderService: LoaderService )
	{
		this.photoURL = `${AppSettings.API_ENDPOINT}/products`;
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
		this.productImages = [];
		this.server = AppSettings.SERVER;
		this.ownProduct = true;
		this.profileImage = "/images/Avatar.jpg";
		this.avatarImage = "/images/Avatar.jpg";
		this.loadingComment = false;
		this.comment = "";
		this.id = -1;
		this.showUserInformation = false;
		this.showDeleteConfirmation = false;
		this.deleteLoading = false;
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

	private showInputFileDialog( fileInput: any ): void
	{
		this.fileInput.nativeElement.click();
	}

	private addPhoto(): void
	{
		if( this.productImages.length === 5 )
			return;
		let fileReader: FileReader = new FileReader();

		fileReader.onload = this.completeOnLoadPhoto.bind( this );
		fileReader.readAsDataURL( this.uploader.queue[this.uploader.queue.length - 1]._file );
	}

	private deletePhoto( index: number ): void
	{
		this.productImages.splice( index, 1 );
		this.uploader.queue[index].remove();
	}

	private completeOnLoadPhoto( e: any ): void
	{
		this.productImages.push( e.target.result );
	}

	private updateProduct(): void
	{
		if( this.uploader.queue.length > 0 )
		{
			this.loaderService.show();
			this.uploader.uploadAll();
		}
		else if( this.product.description && this.product.description.length > 0 )
		{
			this.loaderService.show();
			this.productService.update( this.user.id, this.product.id, this.product )
				.then( product =>
				{
					this.loaderService.hide();
					this.router.navigate( ["/home"] );
				} )
				.catch( error =>
				{
					this.loaderService.hide();
					console.log( error );
					this.router.navigate( ["/home"] );
				} );
		}
		else
			this.router.navigate( ["/home"] );
	}

	private addComment(): void
	{
		if( this.comment.length === 0 )
			return;
		this.loadingComment = true;
		this.productService.addComment( this.product.id, this.user.id, this.comment )
			.then( comment =>
			{
				this.productService.get( this.id )
					.then( product =>
					{
						this.product = new Product( product );
						this.comment = "";
						this.loadingComment = false;
					} )
					.catch( error =>
					{
						console.log( error );
						this.loadingComment = false;
					} );
			} )
			.catch( error =>
			{
				console.log( error );
				this.loadingComment = false;
			} );
	}

	private showUserInformationModal( value: boolean ): void
	{
		this.showUserInformation = value;
	}

	private showDeleteConfirmationModal( value: boolean ): void
	{
		this.showDeleteConfirmation = value;
	}

	private edit(): void
	{
		this.mode = "edit";
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
					this.uploader = new FileUploader( {
						url: `${this.photoURL}/${this.product.id}/photos`,
						allowedMimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
						maxFileSize: 5242880,
						authToken: this.user.token
					} );
					this.uploader.onAfterAddingFile = ( fileItem: FileItem ) =>
					{
						this.addPhoto();
					};
					this.uploader.onCompleteAll = () =>
					{
						if( this.product.description && this.product.description.length > 0 )
						{
							this.productService.update( this.user.id, this.product.id, this.product )
								.then( product =>
								{
									this.loaderService.hide();
									this.router.navigate( ["/home"] );
								} )
								.catch( error =>
								{
									this.loaderService.hide();
									console.log( error );
									this.router.navigate( ["/home"] );
								} );
						}
						else
						{
							this.loaderService.hide();
							this.router.navigate( ["/home"] );
						}
					};
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
					this.mode = "view";
				} )
				.catch( error =>
				{
					this.loaderService.hide();
					console.log( error );
				} );
	}

	private delete(): void
	{
		this.loaderService.show();
		this.productService.delete( this.user.id, this.product.id )
			.then( response =>
			{
				this.loaderService.hide();
				this.router.navigate( ["/profile"] );
			} )
			.catch( error =>
			{
				console.log( error );
				this.loaderService.hide();
			} );
	}

	private setGenre( genre: any ): void
	{
		this.product.productItem.genre = genre;
	}

	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;

		this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
				if( this.user.photo )
					this.profileImage = this.user.photo.image.url;
			} );
		this.userService.getSessionStorageUser();

		this.route.params
			.subscribe( params =>
			{
				if( Object.keys( params ).length > 1 )
					this.router.navigate( ["/home"] );
				else if( Object.keys( params ).length === 0 )
				{
					AppSettings.ACTIVES.product = true;

					this.mode = "create";
					this.product = new Product( {} );
					this.product.available = true;
					this.product.special = false;
				}
				else
				{
					this.id = +params["id"];
					if( !this.id )
						this.router.navigate( ["/home"] );

					this.loaderService.show();
					this.productService.existsOwn( this.id, this.user.id )
						.then( response =>
						{
							this.ownProduct = response.exists;
						} )
						.catch( error =>
						{
							console.log( error );
						} );
					this.productService.get( this.id )
						.then( product =>
						{
							this.product = new Product( product );
							console.log( this.product );
							this.loaderService.hide();
						} )
						.catch( error =>
						{
							console.log( error );
							this.loaderService.hide();
						} );
					this.mode = "view";
				}
			} );

		this.productService.getGenres().subscribe( response =>
			{
				this.genres = response;
			} );
	}
}