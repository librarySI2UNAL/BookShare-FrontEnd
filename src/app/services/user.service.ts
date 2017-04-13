import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { User } from "../classes/user";
import { Interest } from "../classes/interest";

@Injectable()
export class UserService
{
	private headers = new Headers( { "Content-Type": "application/json" } );
	private loginURL = "http://localhost:3000/api/v1/login";
	private usersURL = "http://localhost:3000/api/v1/users";

	constructor( private http: Http ){}

	private handleError( error: any ): Promise<any>
	{
		console.error( "An error occurred", error );
		return Promise.reject( error.message || error );
	}

	login( credentials: any ): Promise<any>
	{
		return this.http.post( `${this.loginURL}`, { data: credentials }, { headers: this.headers } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	getUser( id: number ): Promise<any>
	{
		return this.http.get( `${this.usersURL}/${id}` ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	createUser( user: User ): Promise<any>
	{
		let userAux: any = user;
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		return this.http.post( `${this.usersURL}`, { data: userAux }, { headers: this.headers } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	updateUser( user: User ): Promise<any>
	{
		let userAux: any = user;
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		return this.http.put( `${this.usersURL}/${user.id}`, { data: userAux }, { headers: this.headers } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}
}