import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } 			from './app.component';
import { HomeComponent } 			from './views/homepage/home.component';
import { LoginComponent } 			from './views/login/login.component';
import { ContactusComponent }	 	from './views/contactus/contactus.component';
import { AvailableprodComponent } 	from './views/availableprod/availableprod.component';
import { RegistryComponent } 		from './views/registry/registry.component';
import { ProfileComponent } 		from './views/profile/profile.component';
import { ProductComponent }			from './views/product/product.component';
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
