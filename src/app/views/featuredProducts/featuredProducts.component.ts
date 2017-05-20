import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';

import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: 'featuredProducts',
	providers: [ ProductService ],
	templateUrl: './featuredProducts.component.html',
	styleUrls: ['featuredProducts.component.scss'],
	encapsulation: ViewEncapsulation.None
} )

export class FeaturedProducts implements OnInit{
	products: Product[];
	errorMessage: string;
    productsNotFound: boolean = false;
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
	constructor( private productService: ProductService, private router: Router )
	{
	}

	ngOnInit()
	{
		this.getSpecials()
	}
	
	private getSpecials(): void
	{
		this.productService.getSpecials()
			.subscribe( products =>
			{
				this.products = products;
				if( this.products.length === 0 )
					this.productsNotFound = true;
			}, error => this.errorMessage = <any>error );
	}
	
    goToProductDetail(productId : number): void {
        let link = ['/product', productId];
        this.router.navigate(link);
    }
}