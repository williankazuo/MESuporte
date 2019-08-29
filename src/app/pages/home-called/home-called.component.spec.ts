import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalledComponent } from './home-called.component';

describe('HomeCalledComponent', () => {
  let component: HomeCalledComponent;
  let fixture: ComponentFixture<HomeCalledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCalledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
