import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from "./homepage/app.component";
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AvailableprodComponent } from './availableprod/availableprod.component';
import { RegistryComponent } from './registry/registry.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './app.routes';

import { ProductService } from "./services/product.service";
import { UserService } from "./services/user.service";

@NgModule(
{
	declarations: [
		AppComponent,
		LoginComponent,
		ContactusComponent,
		AvailableprodComponent,
		RegistryComponent,
		ProfileComponent,
		ProductComponent,

	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		AppRoutingModule
	],
	providers: [ ProductService, UserService ],
	bootstrap: [ AppComponent ]
} )

export class AppModule{}
