import { Book } from "./book";
import { Collection } from "./collection";
import { User } from "./user";

export class Product
{
	id: number;
	description: string;
	special: boolean;
	available: boolean;
	value: number;
	productItem: Book | Collection;
	user: User;

	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.description = null;
			this.special = null;
			this.available = null;
			this.value = null;
			this.productItem = null;
			this.user = null;
		}
		else
		{
			this.id = data.id;
			this.description = data.description;
			this.special = data.special;
			this.available = data.available;
			this.value = data.value;
			this.productItem = data.productItem;
			this.user = this.user;
		}
	}
}