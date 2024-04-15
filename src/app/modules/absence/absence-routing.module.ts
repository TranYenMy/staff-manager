import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AbsenceComponent} from "./absence.component";
import {AbsenceListPageComponent} from "./pages/absence-list-page/absence-list-page.component";
import {AbsenceDetailPageComponent} from "./pages/absence-detail-page/absence-detail-page.component";
import {AbsenceRequestComponent} from "./pages/absence-request/absence-request.component";
import {AnnualLeavePageComponent} from "./pages/annual-leave-page/annual-leave-page.component";
import { ManagerApprovalPageComponent } from './pages/manager-approval-page/manager-approval-page.component';

const routes: Routes = [
  {
    path: '',
    component: AbsenceComponent,
    children: [
      {
        path: 'managerApproval',
        component: ManagerApprovalPageComponent
      },
      {
        path: 'MyAnnualLeave',
        component: AnnualLeavePageComponent
      },
      {
        path: 'listAbsence',
        component: AbsenceListPageComponent
      },

      {
        path: 'create/:absenceId',
        component: AbsenceRequestComponent,

      },
      {
        path: 'create',
        component: AbsenceRequestComponent,

      },
      {
        path: 'ViewDetail/:absenceId',
        component: AbsenceDetailPageComponent
      }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule { }
