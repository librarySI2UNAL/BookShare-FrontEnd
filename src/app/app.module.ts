import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { ClarityModule } from "clarity-angular";
import { AgmCoreModule } from "@agm/core";
import { FileUploadModule } from "ng2-file-upload";
import { SwiperModule } from "angular2-useful-swiper";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { ContactUsComponent } from "./views/contactUs/contactUs.component";
import { ProductsComponent } from "./views/products/products.component";
import { SignUpComponent } from "./views/signUp/signUp.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ProductComponent }	from "./views/product/product.component";
import { NearProductsComponent } from "./views/nearProducts/nearProducts.component";
import { LoaderComponent } from "./views/loader/loader.component";

import { NguiMapModule} from '@ngui/map';

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
		LoaderComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=[API_KEY_GOES_HERE]&libraries=visualization&callback=initMap'}),
		HttpModule,
		ClarityModule.forRoot(),
		FileUploadModule,
		AgmCoreModule.forRoot(
		{
			apiKey: "AIzaSyAFUtuJfPLeZeim2f6iUcmK_k1AmysBrGg"
		} ),
		SwiperModule
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