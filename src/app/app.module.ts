import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } 			from './app.component';
import { HomeComponent } 			from './homepage/home.component';
import { LoginComponent } 			from './login/login.component';
import { ContactusComponent }	 	from './contactus/contactus.component';
import { AvailableprodComponent } 	from './availableprod/availableprod.component';
import { RegistryComponent } 		from './registry/registry.component';
import { ProfileComponent } 		from './profile/profile.component';
import { ProductComponent }			 from './product/product.component';
//importar rutas
import { routing } from "./app.routes";
@NgModule(
{
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		ContactusComponent,
		AvailableprodComponent,
		RegistryComponent,
		ProfileComponent,
		ProductComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		//rutas
		routing	
	],
	providers: [],
	bootstrap: [AppComponent]
} )


export class AppModule{}
