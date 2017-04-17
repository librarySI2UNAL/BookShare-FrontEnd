import { Book } from "./book";
import { Collection } from "./collection";
import { User } from "./user";

export class Product
{
	id: number;
	description: string;
	special: boolean;
	available: boolean;
	cover: number;
	status: number;
	value: number;
	code: string;
	codeType: string;
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
			this.cover = null;
			this.status = null;
			this.value = null;
			this.code = null;
			this.codeType = null;
			this.productItem = new Book( {} );
			this.user = null;
		}
		else
		{
			this.id = data.id;
			this.description = data.description;
			this.special = data.special;
			this.available = data.available;
			this.cover = data.cover;
			this.status = data.status;
			this.value = data.value;
			this.code = data.code;
			this.codeType = data.codeType;
			this.productItem = data.productItem;
			this.user = this.user;
		}
	}
}