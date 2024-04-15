import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Absence} from "../../models/absence";
import {AbsenceService} from "../../services/absence.service";
import {ModalComponent} from "../../pages/modal/modal.component";

@Component({
  selector: 'cons-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.scss']
})
export class AbsenceFormComponent implements OnChanges {
  @ViewChild(ModalComponent) Modal?: ModalComponent;

  openModal() {
    this.Modal?.openModal();
  }


  @Input() absence?: Absence;

  absenceForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService
  ) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
        if (this.absence && this.absence) {
          this.absenceForm?.patchValue(this.absence);
        }
  }

  initForm(): void {
    this.absenceForm = this.fb.group({
      startDate: new FormControl(null, Validators.compose([Validators.required])),
      endDate: new FormControl(null, Validators.compose([Validators.required])),
      quantity: new FormControl(null),
      absenceType: new FormControl(null),
      status: new FormControl(null)
    });
  }

  // onSubmit(form: FormGroup): void {
  //   const {valid, value} = form;
  //   if (valid) {
  //     if (this.absence && this.absence?.id) {
  //       this.absenceService.update(value);
  //     } else {
  //       this.absenceService.addNew(value);
  //     }
  //   } else {
  //     console.log('form ko hop le');
  //   }
  // }
}
