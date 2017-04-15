import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { LogInComponent } from "./views/logIn/logIn.component";
import { ContactUsComponent } from "./views/contactUs/contactUs.component";
import { ProductsComponent } from "./views/products/products.component";
import { SignUpComponent } from "./views/signUp/signUp.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ProductComponent }	from "./views/product/product.component";

const routes : Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full"
	},
	{
		path: "home",
		component: HomeComponent	
	},
	{
		path: "log-in",
		component: LogInComponent	
	},
	{
		path: "sign-up",
		component: SignUpComponent	
	},
	{
		path: "contact-us",	 
		component: ContactUsComponent	
	},
	{
		path: "profile",
		component: ProfileComponent	
	},
	{
		path: "products",
		component: ProductsComponent	
	},
	{
		path: "product",
		component: ProductComponent
	}
];

@NgModule(
{
	imports: [ RouterModule.forRoot( routes ) ],
  	exports: [ RouterModule ]
} )

export class AppRoutingModule
{

}