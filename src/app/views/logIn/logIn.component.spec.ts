import { TestBed, async } from "@angular/core/testing";

import { LogInComponent } from "./logIn.component";

describe( "LoginComponent", () =>
{
	beforeEach( async( () =>
	{
		TestBed.configureTestingModule(
		{
			declarations: [
				LogInComponent
			],
		} ).compileComponents();
	} ) );

	it( "should create the app", async( () =>
	{
		const fixture = TestBed.createComponent( LogInComponent );
		const app = fixture.debugElement.componentInstance;
		expect( app ).toBeTruthy();
	} ) );

	it( "should have as title 'Login'", async( () =>
	{
		const fixture = TestBed.createComponent( LogInComponent );
		const app = fixture.debugElement.componentInstance;
		expect( app.title ).toEqual( "Login" );
	} ) );

	it( "should render title in a h1 tag", async( () =>
	{
		const fixture = TestBed.createComponent( LogInComponent );
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect( compiled.querySelector( "h1" ).textContent ).toContain( "Login" );
	} ) );
} );
