import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { User } from "../models/user";
import { Interest } from "../models/interest";
import { AppSettings } from "../app.settings";

@Injectable()
export class UserService
{
	private userSubject: Subject<User>;
	public userState: Observable<User>;

	constructor( private http: Http )
	{
		this.userSubject = new Subject<User>();
		this.userState = this.userSubject.asObservable();
	}

	public getSessionStorageUser(): void
	{
		let userObject: string = sessionStorage.getItem( "user" );
		console.log( userObject );
		let user: User;
		if( userObject )
		{
			user = JSON.parse( userObject );
			console.log( user );
			AppSettings.HEADERS.set( "Authorization", user.token );
		}
		else
			user = new User( {} );
		this.setUser( user );
	}

	public setUser( user: User ): void
	{
		//console.log( user );
		if( user.token )
			sessionStorage.setItem( "user", JSON.stringify( user ) );
		this.userSubject.next( <User>user );
	}

	public logOut(): void
	{
		sessionStorage.removeItem( "user" );
		this.setUser( new User( {} ) );
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