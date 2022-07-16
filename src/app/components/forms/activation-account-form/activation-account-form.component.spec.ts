import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationAccountFormComponent } from './activation-account-form.component';

describe('ActivationAccountFormComponent', () => {
  let component: ActivationAccountFormComponent;
  let fixture: ComponentFixture<ActivationAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationAccountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
