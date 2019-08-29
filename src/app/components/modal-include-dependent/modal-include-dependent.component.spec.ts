import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIncludeDependentComponent } from './modal-include-dependent.component';

describe('ModalIncludeDependentComponent', () => {
  let component: ModalIncludeDependentComponent;
  let fixture: ComponentFixture<ModalIncludeDependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIncludeDependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIncludeDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
