import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzWaveModule} from 'ng-zorro-antd/core/wave';
import {NzTabsModule} from "ng-zorro-antd/tabs";

import * as fromPages from './pages';
import {BalanceRoutingModule} from './balance-routing.module';
import {BaseTableViewerComponent} from "../../shared/components/base-table-viewer/base-table-viewer.component";
import {AbsenceRequestPageComponent} from './pages/absence-request-page/absence-request-page.component';
import {HistoryAbsencePageComponent} from './pages/history-absence-page/history-absence-page.component';
import {AnnualLeaveComponent} from './pages/annual-leave/annual-leave.component';
import {FormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    ...fromPages.pages,
    AbsenceRequestPageComponent,
    HistoryAbsencePageComponent,
    AnnualLeaveComponent,
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzTableModule,
    NzWaveModule,
    NzTabsModule,
    BaseTableViewerComponent,
    FormsModule,
    NzFormModule,
    NzSelectModule
  ],
  providers: [NzModalService, NzMessageService]
})
export class BalanceModule {
}
