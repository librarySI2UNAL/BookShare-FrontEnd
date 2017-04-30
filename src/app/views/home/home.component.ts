import { Component, OnInit, ViewEncapsulation } from "@angular/core";

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
	interests: Array<string>;

	constructor()
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
		this.interests = [
			"assets/images/pencils.jpg",
			"assets/images/pencils.jpg",
			"assets/images/pencils.jpg",
			"assets/images/pencils.jpg"
		];
	}

	ngOnInit()
	{
		
	}
}