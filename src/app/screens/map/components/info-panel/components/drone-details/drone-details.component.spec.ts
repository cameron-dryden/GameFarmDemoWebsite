import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneDetailsComponent } from './drone-details.component';

describe('DroneDetailsComponent', () => {
  let component: DroneDetailsComponent;
  let fixture: ComponentFixture<DroneDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DroneDetailsComponent]
    });
    fixture = TestBed.createComponent(DroneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
