import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerChatComponent } from './container-chat.component';

describe('ContainerChatComponent', () => {
  let component: ContainerChatComponent;
  let fixture: ComponentFixture<ContainerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
