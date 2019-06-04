import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinFlowComponent } from './checkin-flow.component';

describe('CheckinFlowComponent', () => {
  let component: CheckinFlowComponent;
  let fixture: ComponentFixture<CheckinFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
