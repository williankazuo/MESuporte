import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedCallsComponent } from './ended-calls.component';

describe('EndedCallsComponent', () => {
  let component: EndedCallsComponent;
  let fixture: ComponentFixture<EndedCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndedCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
