import { Headers } from "@angular/http";

export class AppSettings
{
	public static SERVER: string = "https://backend-development-debeltranc.c9users.io";
	public static API_ENDPOINT: string = `${AppSettings.SERVER}/api/v1`;
	public static ACTIVES: any = {
		home: false,
		products: false,
		nearProducts: false,
		signUp: false
	};
	public static HEADERS: Headers = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } );
}