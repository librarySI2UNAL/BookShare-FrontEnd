import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./homepage/app.component";
import { AvailableprodComponent } from './availableprod/availableprod.component';


const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'availableprod',  component: AvailableprodComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
