import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";

import { AppSettings } from "../app.settings";

@Injectable()
export class PhotoService
{
	constructor( private http: Http )
	{

	}

	// Handle errors
	private handleError( error: any ): Promise<any>
	{
		console.error( "An error occurred", error );
		return Promise.reject( error.message || error );
	}

	public deleteArray( ids: Array<number>, relation: string ): Promise<any>
	{
		return this.http.delete( `${AppSettings.API_ENDPOINT}/${relation}/photos?ids=${ids}`, { headers: AppSettings.HEADERS } ).toPromise()
			.then( response => response.json().data )
			.catch( this.handleError );
	}
}