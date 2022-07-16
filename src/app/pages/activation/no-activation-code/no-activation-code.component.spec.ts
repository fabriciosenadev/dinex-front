import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoActivationCodeComponent } from './no-activation-code.component';

describe('NoActivationCodeComponent', () => {
  let component: NoActivationCodeComponent;
  let fixture: ComponentFixture<NoActivationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoActivationCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoActivationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
