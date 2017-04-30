import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearProducsComponent } from './near-producs.component';

describe('NearProducsComponent', () => {
  let component: NearProducsComponent;
  let fixture: ComponentFixture<NearProducsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearProducsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearProducsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
