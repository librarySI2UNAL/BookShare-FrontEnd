import { City } from "./city";
import { Interest } from "./interest";

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
	interests: Interest[];
}