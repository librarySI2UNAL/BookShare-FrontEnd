import { Book } from "./book";
import { Collection } from "./collection";

export class Product
{
	id: number;
	description: string;
	special: boolean;
	available: boolean;
	book: any;
	collection: any;
}