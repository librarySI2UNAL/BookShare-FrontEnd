//componentes de la aplicacion
//import { AppModule } from "../app.module";
import { AppComponent } 			from "./app.component";
import { HomeComponent } 			from "./homepage/home.component";
import { LoginComponent } 			from './login/login.component';
import { ContactusComponent } 		from './contactus/contactus.component';
import { AvailableprodComponent }	from './availableprod/availableprod.component';
import { RegistryComponent } 		from './registry/registry.component';
import { ProfileComponent } 		from './profile/profile.component';
import { ProductComponent } 		from './product/product.component';
//componentes de enrutamiento
import { ModuleWithProviders   } from '@angular/core'; 
import { Routes , RouterModule } from '@angular/router'; 


//rutas de la aplicacion
const routes : Routes = [
	
	{
		path: 		'home',
		component:	 HomeComponent	
	},
	
	{
		path: 		'login',
		component:	LoginComponent	
	},
	{
		path: 		'registry',
		component:	RegistryComponent	
	},
	{
		path: 		'contactus',	 
		component:	 ContactusComponent	
	},
	{
		path: 		'',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	
];

//exportar constante con las rutas para ser usada externamente
export const routing: ModuleWithProviders = RouterModule.forRoot(routes); 