import { Genre } from "./genre";

export class ProductItem
{
	id: number;
	type: string;
	name: string;
	author: string;
	genre: Genre;
	editorial: string;
	yearOfPublication: number;

	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.type = null;
			this.name = null;
			this.author = null;
			this.genre = null;
			this.editorial = null;
			this.yearOfPublication = null;
		}
		else
		{
			this.type = data.type;
			this.id = data.id;
			this.name = data.name;
			this.author = data.author;
			this.genre = data.genre;
			this.editorial = data.editorial;
			this.yearOfPublication = data.yearOfPublication;
		}
	}
}