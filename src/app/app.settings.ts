export class AppSettings
{
	public static SERVER: string = "http://localhost:3000";
	public static API_ENDPOINT: string = `${AppSettings.SERVER}/api/v1`;
	public static ACTIVES: any = {
		home: false,
		products: false,
		signUp: false
	};
}