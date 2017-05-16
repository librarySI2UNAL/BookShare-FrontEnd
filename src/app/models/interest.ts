import { Photo } from "./photo";
import { Genre } from "./genre";

export class Interest
{
	id: number;
	name: string;
	photo: Photo;
	genre: Array<Genre>;
}