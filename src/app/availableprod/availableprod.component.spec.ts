import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableprodComponent } from './availableprod.component';

describe('AvailableprodComponent', () => {
  let component: AvailableprodComponent;
  let fixture: ComponentFixture<AvailableprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
