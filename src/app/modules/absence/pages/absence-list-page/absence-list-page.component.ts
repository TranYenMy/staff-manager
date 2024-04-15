import {Component, OnInit} from '@angular/core';
import {Absence} from "../../models/absence";
import {AbsenceService} from "../../services/absence.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'cons-absence-list-page',
    templateUrl: './absence-list-page.component.html',
    styleUrls: ['./absence-list-page.component.scss']
})
export class AbsenceListPageComponent implements OnInit {
  from?: String;
  to?: String;
  status = [
    {id: 1, text: 'DRAFT'},
    {id: 2, text: 'Submitted'},
    {id: 3, text: 'HR_Approved'},
    {id: 4, text: 'Manager_Approved'},
    {id: 5, text: 'Rejected'},
    {id: 6, text: 'Cancelled'}
  ]

  listOfData: Absence[] = [];
  searchForm?: FormGroup

    constructor(
        private fb: FormBuilder,
        private absenceService: AbsenceService) {
    }

    // ngOnInit(): void {
    //   this.listOfData = this.absenceService.getAbsenceList();
    // }


  initForm(){
      this.searchForm=  this.fb.group({
        fromDate : new FormControl(null),
        toDate : new FormControl(null),
        status : new FormControl(null)
      })
  }

    ngOnInit(): void {
    this.initForm();
        // fake
        // const payload = {
        //     body: {
        //         from: "2023-10-20",
        //         to: "2023-10-30",
        //         status : "DRAFT",
        //     }
        // }


      const from = '2023-10-10';
      const to = '2023-10-30';
      const status = 'DRAFT';
      this.absenceService.getAbsenceHistory(from, to, status).subscribe(res => {
        if (res.responseCode === '200') {
          this.listOfData = res?.body || [];
        }

      });

    }

  getAbsenceDetail(absenceId: any): Absence | undefined {
    return this.listOfData.find(e => e.id === absenceId);
  }
    onSubmit(){

    }

    itemsPerPage = 10;
    currentPage = 1;
}
