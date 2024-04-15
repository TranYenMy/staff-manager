import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAbsencePageComponent } from './history-absence-page.component';

describe('HistoryAbsencePageComponent', () => {
  let component: HistoryAbsencePageComponent;
  let fixture: ComponentFixture<HistoryAbsencePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryAbsencePageComponent]
    });
    fixture = TestBed.createComponent(HistoryAbsencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
