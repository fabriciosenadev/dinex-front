import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaunchComponent } from './edit-launch.component';

describe('EditLaunchComponent', () => {
  let component: EditLaunchComponent;
  let fixture: ComponentFixture<EditLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLaunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
