import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { User } from "../classes/user";
import { Interest } from "../classes/interest";

@Injectable()
export class UserService
{
	private user: User;
	private headers: Headers;
	private loginURL: string;
	private usersURL: string;

	constructor( private http: Http )
	{
		this.headers = new Headers( { "Content-Type": "application/json" } );
		this.loginURL = "http://localhost:3000/api/v1/login";
		this.usersURL = "http://localhost:3000/api/v1/users";
	}

	public setUser( user: User ): void
	{
		this.user = user;
	}

	public getUser(): User
	{
		return this.user;
	}

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

	get( id: number ): Promise<any>
	{
		return this.http.get( `${this.usersURL}/${id}` ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	create( user: User, password: string ): Promise<any>
	{
		let userAux: any = Object.assign( {}, user );
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		userAux.password = password;
		userAux.last_name = user.lastName;
		delete userAux.lastName;
		return this.http.post( `${this.usersURL}`, { data: userAux }, { headers: this.headers } ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	update( user: User ): Promise<any>
	{
		let userAux: any = user;
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		return this.http.put( `${this.usersURL}/${user.id}`, { data: userAux }, { headers: this.headers } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	delete( id: number ): Promise<any>
	{
		return this.http.delete( `${this.usersURL}/${id}` ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError )
	}
}