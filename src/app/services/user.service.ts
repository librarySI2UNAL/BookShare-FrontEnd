import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { User } from "../models/user";
import { Interest } from "../models/interest";
import { AppSettings } from "../app.settings";

@Injectable()
export class UserService
{
	private user: User;

	constructor( private http: Http )
	{
		
	}

	// Getters
	public getUser(): User
	{
		let user: any = sessionStorage.getItem( "user" );
		if( user )
		{
			this.user = JSON.parse( user );
			if( !AppSettings.HEADERS.get( "Authorization" ) )
				AppSettings.HEADERS.append( "Authorization", this.user.token );
		}
		else
			this.user = new User( {} );
		return this.user;
	}

	// Setters
	public setUser( user: User ): void
	{
		this.user = user;
		sessionStorage.setItem( "user", JSON.stringify( this.user ) );
	}

	public logOut(): void
	{
		sessionStorage.removeItem( "user" );
	}

	// Handle errors
	private handleError( error: any ): Promise<any>
	{
		console.error( "An error occurred", error );
		return Promise.reject( error.message || error );
	}

	public logIn( credentials: any ): Promise<any>
	{
		return this.http.post( `${AppSettings.API_ENDPOINT}/login`, credentials, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	public get( id: number ): Promise<any>
	{
		return this.http.get( `${AppSettings.API_ENDPOINT}/users/${id}` ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	public create( user: User, password: string ): Promise<any>
	{
		let userAux: any = Object.assign( {}, user );
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		userAux.password = password;
		userAux.last_name = user.lastName;
		delete userAux.lastName;
		return this.http.post( `${AppSettings.API_ENDPOINT}/users`, { data: userAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	public update( user: User ): Promise<any>
	{
		let userAux: any = Object.assign( {}, user );
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		return this.http.put( `${AppSettings.API_ENDPOINT}/users/${user.id}`, { data: userAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	public delete( id: number ): Promise<any>
	{
		return this.http.delete( `${AppSettings.API_ENDPOINT}/users/${id}` ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	public existsWithEmail( email: string ): Promise<any>
	{
		return this.http.get( `${AppSettings.API_ENDPOINT}/users/validate?email=${email}` ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}
}