import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbsenceService} from "../../services/absence.service";
import {Absence} from "../../models/absence";

@Component({
  selector: 'cons-absence-detail-page',
  templateUrl: './absence-detail-page.component.html',
  styleUrls: ['./absence-detail-page.component.scss']
})
export class AbsenceDetailPageComponent implements OnInit {
  absenceId?: string | null;
  absence?: Absence;
  absenceItem: any;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    // if (this.route.snapshot.paramMap.get('absenceId')) {
    //   this.absenceId = this.route.snapshot.paramMap.get('absenceId');
    //
    //   this.absence = this.absenceService.getAbsenceDetail(this.absenceId);
    // }

    }
  }

