import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchingMonthDetailsComponent } from './launching-month-details.component';

describe('LaunchingMonthDetailsComponent', () => {
  let component: LaunchingMonthDetailsComponent;
  let fixture: ComponentFixture<LaunchingMonthDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchingMonthDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchingMonthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
