import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeavePageComponent } from './annual-leave-page.component';

describe('AnnualLeavePageComponent', () => {
  let component: AnnualLeavePageComponent;
  let fixture: ComponentFixture<AnnualLeavePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualLeavePageComponent]
    });
    fixture = TestBed.createComponent(AnnualLeavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
