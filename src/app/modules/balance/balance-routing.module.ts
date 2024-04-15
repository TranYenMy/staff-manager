import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AnnexePageComponent,
  ContractPageComponent,
  DetailEstimatePageComponent,
  FsPageComponent,
  FunctionalAreaPageComponent,
  GeneralEstimatePageComponent,
  GuaranteePageComponent,
  PaymentRequestPageComponent,
  ProjectPageComponent
} from './pages';
import {AbsenceRequestPageComponent} from "./pages/absence-request-page/absence-request-page.component";
import {HistoryAbsencePageComponent} from "./pages/history-absence-page/history-absence-page.component";
import {AnnualLeaveComponent} from "./pages/annual-leave/annual-leave.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'project',
        component: ProjectPageComponent
      },
      {
        path: 'functional-area',
        component: FunctionalAreaPageComponent
      },
      {
        path: 'fs',
        component: FsPageComponent
      },
      {
        path: 'general-estimate',
        component: GeneralEstimatePageComponent
      },
      {
        path: 'detail-estimate',
        component: DetailEstimatePageComponent
      },
      {
        path: 'contract',
        component: ContractPageComponent
      },
      {
        path: 'guarantee',
        component: GuaranteePageComponent
      },
      {
        path: 'annexe',
        component: AnnexePageComponent
      },
      {
        path: 'payment-request',
        component: PaymentRequestPageComponent
      },
      {
        path: 'absence-request',
        component: AbsenceRequestPageComponent
      },
      {
        path: 'absence-history',
        component: HistoryAbsencePageComponent
      },
      {
        path: 'annual-leave',
        component: AnnualLeaveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule {
}
