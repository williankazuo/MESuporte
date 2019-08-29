import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalledSubjectsComponent } from './called-subjects.component';

describe('CalledSubjectsComponent', () => {
  let component: CalledSubjectsComponent;
  let fixture: ComponentFixture<CalledSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalledSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalledSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
