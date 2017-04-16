import { Genre } from "./genre";

export class Book
{
	id: number;
	name: string;
	description: string;
	cover: number;
	status: number;
	author: string;
	genre: Genre;
	editorial: string;
	yearOfPublication: number;
	code: string;
	codeType: string;

	constructor( data: any )
	{
		if( Object.keys( data ).length === 0 )
		{
			this.id = null;
			this.name = null;
			this.description = null;
			this.cover = null;
			this.status = null;
			this.author = null;
			this.genre = new Genre();
			this.editorial = null;
			this.yearOfPublication = null;
			this.code = null;
			this.codeType = null;
		}
		else
		{
			this.id = data.id;
			this.name = data.name;
			this.description = data.description;
			this.cover = data.cover;
			this.status = data.status;
			this.author = data.author;
			this.genre = data.genre;
			this.editorial = data.editorial;
			this.yearOfPublication = data.yearOfPublication;
			this.code = data.code;
			this.codeType = data.codeType;
		}
	}
}