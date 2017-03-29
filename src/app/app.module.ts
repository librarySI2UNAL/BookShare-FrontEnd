import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from "./login/app.component";
import { HomepageComponent } from './homepage/homepage.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule(
{
	declarations: [
		AppComponent,
		HomepageComponent,
		ContactusComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
} )

export class AppModule{}
