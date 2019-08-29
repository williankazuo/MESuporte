import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalledComponent } from './new-called.component';

describe('NewCalledComponent', () => {
  let component: NewCalledComponent;
  let fixture: ComponentFixture<NewCalledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCalledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
