import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Absence} from '../../models/absence';
import {AbsenceService} from "../../services/absence.service";


@Component({
  selector: 'cons-manager-approval-page',
  templateUrl: './manager-approval-page.component.html',
  styleUrls: ['./manager-approval-page.component.scss']
})
export class ManagerApprovalPageComponent implements OnInit {
  listOfData: Absence[] = [];

  constructor(private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
  }

  // getListForm(): void {
  //   this.absenceService.getListFormMgr().subscribe(res => {
  //     if (res.responseCode === '200') {
  //       this.listOfData = res.body;
  //     }
  //   })
  // }

  itemsPerPage = 10;
  currentPage = 1;
}
