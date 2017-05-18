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
			this.id = data[this.type].id;
			this.name = data[this.type].name;
			this.author = data[this.type].author;
			this.genre = data[this.type].genre;
			this.editorial = data[this.type].editorial;
			this.yearOfPublication = data[this.type].yearOfPublication;
		}
	}
}