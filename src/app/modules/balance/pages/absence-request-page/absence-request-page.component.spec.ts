import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceRequestPageComponent } from './absence-request-page.component';

describe('AbsenceRequestPageComponent', () => {
  let component: AbsenceRequestPageComponent;
  let fixture: ComponentFixture<AbsenceRequestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceRequestPageComponent]
    });
    fixture = TestBed.createComponent(AbsenceRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
