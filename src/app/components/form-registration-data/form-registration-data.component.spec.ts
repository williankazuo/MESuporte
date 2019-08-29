import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistrationDataComponent } from './form-registration-data.component';

describe('FormRegistrationDataComponent', () => {
  let component: FormRegistrationDataComponent;
  let fixture: ComponentFixture<FormRegistrationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegistrationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistrationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
