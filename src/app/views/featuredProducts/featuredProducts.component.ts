import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

import { Product } from "../../models/product";
import { User } from "../../models/user";
import { ProductService } from "../../services/product.service";
import { UserService } from "../../services/user.service";
import { LoaderService } from "../../services/loader.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: 'featuredProducts',
	providers: [ ProductService,
	             UserService],
	templateUrl: './featuredProducts.component.html',
	styleUrls: ['featuredProducts.component.scss'],
	encapsulation: ViewEncapsulation.None
} )

export class FeaturedProducts implements OnInit{
	products: Product[] = [];
	user: User;
	errorMessage: string;
    productsNotFound: boolean = true;
    server: string = AppSettings.SERVER;
    genericPhotoURL: string = "/images/book_cover.jpg";
    swiperConfig: any = {
		pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 50,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
	};
	constructor( private productService: ProductService,
		private userService: UserService,
		private loaderService: LoaderService,
		private router: Router )
	{
	}

	ngOnInit()
	{
		this.getSpecials();
		this.getUser();
	}
	
	private getSpecials(): void
	{
		this.productService.getSpecials()
			.subscribe( products =>
			{
				this.products = [];
				for( let i = 0; i < products.length; ++i )
					this.products.push( new Product( products[i] ) );
				this.productsNotFound = this.products.length === 0;
				this.loaderService.hide();

			}, error =>
			{
				this.errorMessage = <any>error;
				this.loaderService.hide();
			} );
	}
	
	private getUser(): void
	{
	    this.userService.userState
			.subscribe( user =>
			{
				this.user = user;
			} );
		this.userService.getSessionStorageUser();
	}
	
    goToProductDetail(productId : number): void {
        if(this.user.token){
            this.router.navigate(['/product', productId]);
        }
    }
}