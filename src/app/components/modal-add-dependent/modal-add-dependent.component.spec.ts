import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddDependentComponent } from './modal-add-dependent.component';

describe('ModalAddDependentComponent', () => {
  let component: ModalAddDependentComponent;
  let fixture: ComponentFixture<ModalAddDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
