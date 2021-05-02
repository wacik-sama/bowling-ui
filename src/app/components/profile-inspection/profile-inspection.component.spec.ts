import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInspectionComponent } from './profile-inspection.component';

describe('ProfileInspectionComponent', () => {
  let component: ProfileInspectionComponent;
  let fixture: ComponentFixture<ProfileInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
