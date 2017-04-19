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
			this.genre = new Genre();
			this.editorial = null;
			this.yearOfPublication = null;
		}
		else
		{
			this.id = data.id;
			this.name = data[data.type].name;
			this.author = data[data.type].author;
			this.genre = new Genre();
			this.genre.id = data[data.type].genre;
			this.editorial = data[data.type].editorial;
			this.yearOfPublication = data[data.type].yearOfPublication;
			this.type = "Book";
		}
	}
}