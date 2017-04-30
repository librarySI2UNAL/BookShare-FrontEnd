import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Interest } from "../../classes/interest";

import { ProductService } from "../../services/product.service";
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

	constructor( private productService: ProductService )
	{
		this.swiperConfig = {
			pagination: ".swiper-pagination",
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
		this.productService.getInterests()
			.subscribe( interests =>
			{
				this.interests = interests;
				this.showSwiper = true;
			} );
	}
}