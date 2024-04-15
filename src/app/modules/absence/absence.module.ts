import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRoutingModule } from './absence-routing.module';
import { AbsenceComponent } from './absence.component';
import { AbsenceListPageComponent } from './pages/absence-list-page/absence-list-page.component';
import { AbsenceDetailPageComponent } from './pages/absence-detail-page/absence-detail-page.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import { AbsenceFormComponent } from './components/absence-form/absence-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormFieldValidationDirective} from "../../shared/directives/form-field-validation";
import { AbsenceRequestComponent } from './pages/absence-request/absence-request.component';
import { AnnualLeavePageComponent } from './pages/annual-leave-page/annual-leave-page.component';
import { ModalComponent } from './pages/modal/modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import { ManagerApprovalPageComponent } from './pages/manager-approval-page/manager-approval-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    AbsenceComponent,
    AbsenceListPageComponent,
    AbsenceDetailPageComponent,
    AbsenceFormComponent,
    AbsenceRequestComponent,
    AnnualLeavePageComponent,
    ModalComponent,
    ManagerApprovalPageComponent
  ],
    imports: [
        CommonModule,
        AbsenceRoutingModule,
        NzTableModule,
        NzDividerModule,
        NzButtonModule,
        NzIconModule,
        NzPageHeaderModule,
        ReactiveFormsModule,
        FormFieldValidationDirective,
        NzModalModule,
        NzLayoutModule,
        NzBreadCrumbModule,
        NzDatePickerModule,
        NzSelectModule
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AbsenceModule { }
