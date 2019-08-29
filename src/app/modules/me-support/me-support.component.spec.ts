import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeSupportComponent } from './me-support.component';

describe('MeSupportComponent', () => {
  let component: MeSupportComponent;
  let fixture: ComponentFixture<MeSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
