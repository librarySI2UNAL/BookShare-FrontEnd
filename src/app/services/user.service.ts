import { Injectable } from "@angular/core";
 import { Headers, Http, Response } from "@angular/http";
 import { Observable } from "rxjs/Observable";
 import "rxjs/add/operator/toPromise";
 import "rxjs/add/operator/catch";
 
 import { User } from "../classes/user";
 
 @Injectable()
 export class UserService
 {
 	private headers = new Headers( { "Content-Type": "application/json" } );
 
 	constructor( private http: Http )
 	{}
 
 	private handleError( error: Response | any )
 	{
 		let errMsg: string;
 		if( error instanceof Response )
 		{
 			const body = error.json() || "";
 			const err = body.error || JSON.stringify( body );
 			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
 		}
 		else
 		{
 			errMsg = error.message ? error.message : error.toString();
 		}
 		console.error( errMsg );
 		
 		return Observable.throw( errMsg );
 	}
 
 	login( credentials: any ): Promise<User>
 	{
 		return this.http.post( `http://localhost:3000/api/v1/login`, { user: credentials }, { headers: this.headers } ).toPromise()
 			.then( response => response.json().data )
 			.catch( this.handleError );
 	}
 
 	createUser( user: User ): Promise<User>
 	{
 		return this.http.post( `http://localhost:3000/api/v1/users`, { user: user }, { headers: this.headers } ).toPromise()
 			.then( response => response.json().data )
 			.catch( this.handleError );
 	}
 }