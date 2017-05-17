import { City } from "./city";
import { Interest } from "./interest";
import { Product } from "./product";
import { Photo } from "./photo";

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
	photo: Photo;
	city: City;
	interests: Interest[];
	product: Product[];

	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.token = null;
			this.name = null;
			this.lastName = null;
			this.email = null;
			this.qualification = null;
			this.latitude = null;
			this.longitude = null;
			this.city = null;
			this.photo = null;
			this.interests = [];
			this.product = [];
		}
		else
		{
			this.id = data.data.id;
			this.token = data.token;
			this.name = data.data.name;
			this.lastName = data.data.lastName;
			this.email = data.data.email;
			this.qualification = +data.data.qualification;
			this.latitude = +data.data.latitude;
			this.longitude = +data.data.longitude;
			this.city = data.data.city;
			this.photo = data.data.photo;
			this.interests = data.data.interests;
			this.product = data.data.product;
		}
	}
}