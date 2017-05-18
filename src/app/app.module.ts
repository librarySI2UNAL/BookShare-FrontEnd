import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ClarityModule } from "clarity-angular";
import { NguiMapModule} from '@ngui/map';
import { FileUploadModule } from "ng2-file-upload";
import { SwiperModule } from "angular2-useful-swiper";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { ContactUsComponent } from "./views/contactUs/contactUs.component";
import { ProductsComponent } from "./views/products/products.component";
import { SignUpComponent } from "./views/signUp/signUp.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ProductComponent }	from "./views/product/product.component";
import { NearProductsComponent } from "./views/nearProducts/nearProducts.component";
import { MapComponent } from "./views/map/map.component";
import { FeaturedProducts } from "./views/featuredProducts/featuredProducts.component";
import { LoaderComponent } from "./views/loader/loader.component";

import { UserService } from "./services/user.service";
import { ProductService } from "./services/product.service";
import { LoaderService } from "./services/loader.service";

import { AppRoutingModule } from "./app.routes";

@NgModule(
{
	declarations: [
		AppComponent,
		HomeComponent,
		ContactUsComponent,
		ProductsComponent,
		SignUpComponent,
		ProfileComponent,
		ProductComponent,
		NearProductsComponent,
		MapComponent,
		FeaturedProducts,
		LoaderComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC-f5ER_apawz40mq9fOyXchgZQiuiE_n8&libraries=visualization&callback=initMap'}),
		HttpModule,
		ClarityModule.forRoot(),
		FileUploadModule,
		SwiperModule,
		NguiAutoCompleteModule
	],
	providers: [
		UserService,
		ProductService,
		LoaderService
	],
	bootstrap: [
		AppComponent
	]
} )

export class AppModule
{

}