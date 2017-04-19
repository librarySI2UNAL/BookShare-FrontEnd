import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AlertModule } from "ngx-bootstrap";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

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

import { AppRoutingModule } from "./app.routes";

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
		ProductComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AlertModule.forRoot(),
		TypeaheadModule.forRoot()
	],
	providers: [
		UserService,
		ProductService
	],
	bootstrap: [
		AppComponent
	]
} )

export class AppModule
{
	
}