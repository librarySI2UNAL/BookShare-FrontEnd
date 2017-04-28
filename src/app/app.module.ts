import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AlertModule } from "ngx-bootstrap";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { LogInComponent } from "./views/logIn/logIn.component";
import { ContactUsComponent } from "./views/contactUs/contactUs.component";
import { ProductsComponent } from "./views/products/products.component";
import { SignUpComponent } from "./views/signUp/signUp.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ProductComponent }	from "./views/product/product.component";

import { UserService } from "./services/user.service";
import { ProductService } from "./services/product.service";
import { PhotoService } from "./services/photo.service";

import { AppRoutingModule } from "./app.routes";

import { NearProducsComponent } from './near-producs/near-producs.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule(
{
	declarations: [
		AppComponent,
		HomeComponent,
		LogInComponent,
		ContactUsComponent,
		ProductsComponent,
		SignUpComponent,
		ProfileComponent,
		ProductComponent,
		NearProducsComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		FileUploadModule,
		AlertModule.forRoot(),
		TypeaheadModule.forRoot(),
		AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFUtuJfPLeZeim2f6iUcmK_k1AmysBrGg'
    })
	],
	providers: [
		UserService,
		ProductService,
		PhotoService
	],
	bootstrap: [
		AppComponent
	]
} )

export class AppModule
{

}
