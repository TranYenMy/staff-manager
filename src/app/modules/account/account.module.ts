import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';

import * as fromPages from './pages';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ...fromPages.pages
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NzPageHeaderModule,
    NzTableModule,
    NzSwitchModule,
    FormsModule
  ]
})
export class AccountModule {
}
