import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzModalService} from 'ng-zorro-antd/modal';

import {MDRoutingModule} from './md-routing.module';

import * as fromPages from './pages'

import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzMessageService} from 'ng-zorro-antd/message';




@NgModule({
  declarations: [
    ...fromPages.pages
  ],
  imports: [
    CommonModule,
    MDRoutingModule,
    NzPageHeaderModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
  ],
  providers: [NzModalService, NzMessageService]
})
export class MDModule {
}
