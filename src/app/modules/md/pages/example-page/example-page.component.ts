import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ChoiceExcelComponent} from '../../../../shared/components/choice-excel/choice-excel.component';
import {ExampleService} from '../../services';
import {finalize, Subscription} from 'rxjs';
import {
  NotificationModalComponent
} from '../../../../shared/components/notification-modal/notification-modal.component';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AppConstants} from '../../../../app-constants';


@Component({
  selector: 'cons-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  isUploading = false;

  tableFields = ['description', 'code', 'eCode', 'comName', 'projectName', 'ticketName'];
  tempData: any[] = [];
  uploadConfig: any;

  constructor(
    private modalService: NzModalService,
    private exampleService: ExampleService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  openFormUpload(): void {
    const modal = this.modalService.create({
      nzTitle: 'Upload file excel',
      nzContent: ChoiceExcelComponent,
      nzData: {
        fields: this.tableFields
      }
    });

    modal.afterClose.subscribe(res => {
      this.tempData = modal.componentInstance?.tempData || [];
      this.uploadConfig = modal.componentInstance?.settingForm.value || null;
    })
  }

  submitData(): void {
    if (this.tempData.length > 0) {
      this.isUploading = true;
      const loginSubscr = this.exampleService.bulkImport(this.tempData).subscribe(res => {
        if (res && res?.code === AppConstants.API_SUCCESS_CODE) {
          this.message.create('success', `Import success`);
        } else {
          this.message.create('error', `Import failed, please check your file again!`);
        }
      }, error => {
        console.log(error);
        this.message.create('error', `Import failed`);
      }, () => {
        this.isUploading = false;
      });

      this.unsubscribe.push(loginSubscr);
    }
  }

  cancelSubmitting(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  private handelSuccess(): void {
    this.modalService.create({
      nzTitle: 'Upload file excel',
      nzContent: NotificationModalComponent,
      nzData: {
        data: this.tempData.length
      }
    });
  }
}
