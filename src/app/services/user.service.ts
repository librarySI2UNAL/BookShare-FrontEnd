import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { User } from "../models/user";
import { Product } from "../models/product";
import { Interest } from "../models/interest";
import { AppSettings } from "../app.settings";

@Injectable()
export class UserService
{
	private userSubject: Subject<User>;
	public userState: Observable<User>;
	private logInURL: string;
	private usersURL: string;

	constructor( private http: Http )
	{
		this.userSubject = new Subject<User>();
		this.userState = this.userSubject.asObservable();
		this.logInURL = `${AppSettings.API_ENDPOINT}/login`;
		this.usersURL = `${AppSettings.API_ENDPOINT}/users`;
	}

	public getSessionStorageUser(): void
	{
		let userString: string = sessionStorage.getItem( "user" );
		let user: User;
		if( userString )
		{
			let data: any = { data: JSON.parse( userString ) };
			data.token = data.data.token;
			delete data.data.token;
			user = new User( data );
			if( !AppSettings.HEADERS.has( "Authorization" ) )
				AppSettings.HEADERS.set( "Authorization", user.token );
		}
		else
			user = new User( {} );
		this.setUser( user );
	}

	public setUser( user: User, save: boolean = false ): void
	{
		if( user.token && save )
			sessionStorage.setItem( "user", JSON.stringify( user ) );
		this.userSubject.next( <User>user );
	}

	public logOut(): void
	{
		sessionStorage.removeItem( "user" );
		this.setUser( new User( {} ) );
		AppSettings.HEADERS = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } );
	}

	// Handle errors
	private handleError( error: any ): Promise<any>
	{
		console.error( "An error occurred", error );
		return Promise.reject( error.message || error );
	}

	public logIn( credentials: any ): Promise<any>
	{
		return this.http.post( this.logInURL, credentials, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	public get( id: number ): Promise<any>
	{
		return this.http.get( `${this.usersURL}/${id}` ).toPromise()
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
		delete userAux.id;
		delete userAux.token;
		delete userAux.city;
		delete userAux.photo;
		return this.http.post( this.usersURL, { data: userAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}

	public update( user: User ): Promise<any>
	{
		let userAux: any = Object.assign( {}, user );
		userAux.interests = user.interests.map( ( interest: Interest ) => interest.id );
		userAux.last_name = user.lastName;
		delete userAux.lastName;
		delete userAux.id;
		delete userAux.token;
		delete userAux.city;
		delete userAux.photo;
		return this.http.put( `${this.usersURL}/${user.id}`, { data: userAux }, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	public delete( id: number ): Promise<any>
	{
		return this.http.delete( `${this.usersURL}/${id}` ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}

	public existsWithEmail( email: string ): Promise<any>
	{
		return this.http.get( `${this.usersURL}/validate?email=${email}` ).toPromise()
			.then( response => response.json() )
			.catch( this.handleError );
	}
	
	public getNear( userId: number, distance: number ): Observable<Array<User>>
	{
		return this.http.get( `${this.usersURL}/${userId}/near?distance=${distance}`, { headers: AppSettings.HEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
	}
}