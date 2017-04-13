import { City } from "./city";

export class User
{
	id: number;
	token: string;
	name: string;
	lastName: string;
	email: string;
	qualification: number;
	latitude: number;
	longitude: number;
	city: City;
	interests: string[];
}