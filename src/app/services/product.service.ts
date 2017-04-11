import { Injectable } from "@angular/core"; 
import { Http } from "@angular/http"; 
import { Observable } from "rxjs/Observable"; 
import "rxjs/add/operator/map"; 
 
import { Product } from "../classes/product"; 
 
@Injectable() 
export class ProductService 
{ 
  constructor( private Http: Http ) 
  {} 
 
 
}