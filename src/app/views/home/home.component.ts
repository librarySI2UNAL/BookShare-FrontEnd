import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Interest } from "../../models/interest";
import { LoaderComponent } from "../loader/loader.component";

import { ProductService } from "../../services/product.service";
import { LoaderService } from "../../services/loader.service";
import { AppSettings } from "../../app.settings";

@Component(
{
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	encapsulation: ViewEncapsulation.None
} )

export class HomeComponent implements OnInit
{
	swiperConfig: any;
	showSwiper: boolean;
	interests: Array<Interest>;
	server: string;

	constructor( private productService: ProductService,
		private loaderService: LoaderService )
	{
		this.swiperConfig = {
			pagination: ".swiper-pagination",
			paginationClickable: true,
        	nextButton: '.swiper-button-next',
        	prevButton: '.swiper-button-prev',
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows : true
			}
		};
		this.showSwiper = false;
		this.server = AppSettings.SERVER;
	}

	private selectInterest( index: number )
	{
		console.log( index );
	}

	ngOnInit()
	{
		for( let view in AppSettings.ACTIVES )
			AppSettings.ACTIVES[view] = false;
		AppSettings.ACTIVES.home = true;
		
		this.loaderService.show();
		this.productService.getInterests()
			.subscribe( interests =>
			{
				this.interests = interests;
				this.showSwiper = true;
				this.loaderService.hide();
			} );
	}
}