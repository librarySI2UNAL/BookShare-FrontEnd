import { Genre } from "./genre";

export class Collection
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
}