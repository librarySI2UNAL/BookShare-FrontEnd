import { Headers } from "@angular/http";

export class AppSettings
{
	public static SERVER: string = "https://bookshare-back.herokuapp.com";
	public static API_ENDPOINT: string = `${AppSettings.SERVER}/api/v1`;
	public static ACTIVES: any = {
		home: false,
		products: false,
		product: false,
		nearProducts: false,
		signUp: false
	};
	public static HEADERS: Headers = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } );
}
