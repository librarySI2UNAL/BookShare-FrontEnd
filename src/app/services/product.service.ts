import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Product } from "../classes/product";
import { Genre } from "../classes/genre";
import { Interest } from "../classes/interest";
import { AppSettings } from "../app.settings";

import { UserService } from "./user.service";

@Injectable()
export class ProductService
{
	private productsURL: string;
	private usersURL: string;
	private genresURL: string;
	private interestsURL: string;

	constructor( private http: Http,
		private userService: UserService )
	{
		this.productsURL = `${AppSettings.API_ENDPOINT}/products`;
		this.usersURL = `${AppSettings.API_ENDPOINT}/users`;
		this.genresURL = `${AppSettings.API_ENDPOINT}/genres`;
		this.interestsURL = `${AppSettings.API_ENDPOINT}/interests`;
	}

	private handlePromiseError( error: any ): Promise<any>
	{
		console.error( "An error occurred", error );
		return Promise.reject( error.message || error );
	}

	private handleError( error: Response | any )
	{
		let errMsg: string;
		if( error instanceof Response )
		{
			const body = error.json() || "";
			const err = body.error || JSON.stringify( body );
			errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
		}
		else
		{
			errMsg = error.message ? error.message : error.toString();
		}
		console.error( errMsg );

		return Observable.throw( errMsg );
	}

	getInterests(): Observable<Array<Interest>>
	{
		return this.http.get( `${this.interestsURL}` )
			.map( ( response: Response ) => response.json().data as Array<Interest> )
			.catch( this.handleError );
	}

	getGenres(): Observable<Array<Genre>>
	{
		return this.http.get( `${this.genresURL}` )
			.map( ( response: Response ) => response.json().data as Array<Genre> )
			.catch( this.handleError );
	}

	availables( page: number, perPage: number ): Observable<any>
	{
		return this.http.get( `${this.productsURL}?page=${page}&per_page=${perPage}`, { headers: AppSettings.HEADERS } )
			.map( ( r: Response ) => r.json() )
			.catch( this.handleError );
	}

	get( id: number ): Promise<any>
	{
		return this.http.get( `${this.productsURL}/${id}` ).toPromise()
			.then( response => response.json().data )
			.catch( this.handlePromiseError );
	}

	create( product: Product ): Promise<any>
	{
		let productAux: any = Object.assign( {}, product );
		productAux.product_item = product.productItem;
		productAux.product_item.genre = product.productItem.genre.id;
		productAux.product_item.year_of_publication = product.productItem.yearOfPublication;
		delete productAux.productItem;
		delete productAux.product_item.yearOfPublication;
		productAux.code_type = product.codeType;
		delete productAux.codeType;
		return this.http.post( `${this.usersURL}/1/products`, { data: productAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handlePromiseError );
	}

	update( id: number, product: Product ): Promise<any>
	{
		let productAux: any = Object.assign( {}, product );
		productAux.product_item = product.productItem;
		productAux.product_item.genre = product.productItem.genre.id;
		productAux.product_item.year_of_publication = product.productItem.yearOfPublication;
		delete productAux.productItem;
		delete productAux.product_item.yearOfPublication;
		productAux.code_type = product.codeType;
		delete productAux.codeType;
		return this.http.put( `${this.usersURL}/1/products/${id}`, { data: productAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handlePromiseError );
	}
}
