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
}