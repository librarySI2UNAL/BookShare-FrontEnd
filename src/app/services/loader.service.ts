import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { LoaderState } from "../views/loader/loader.component";

@Injectable()
export class LoaderService
{
	loaderSubject: Subject<LoaderState>;
	loaderState: Observable<LoaderState>;

	constructor()
	{
		this.loaderSubject = new Subject<LoaderState>();
		this.loaderState = this.loaderSubject.asObservable();
	}

	public show(): void
	{
		this.loaderSubject.next( <LoaderState>{ show: true } );
	}

	public hide(): void
	{
		this.loaderSubject.next( <LoaderState>{ show: false } );
	}
}