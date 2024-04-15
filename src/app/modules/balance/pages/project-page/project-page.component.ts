import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ChoiceExcelComponent} from '../../../../shared/components/choice-excel/choice-excel.component';
import {AppConstants} from '../../../../app-constants';
import {BalanceService} from '../../services';
import {ConfirmSubmitComponent} from "../../../../shared/components/confirm-submit/confirm-submit.component";

@Component({
  selector: 'cons-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnDestroy{
  private unsubscribe: Subscription[] = [];
  isUploading = false;

  tableFields = [
    'code',
    'lldCode',
    'tradeCode',
    'name',
    'tradeName',
    'address',
    'projectTypeId',
    'projectGroupId',
    'projectStatusId',
    'organizationId',
    'regionId',
    'landBankId',
    'startedAt',
    'endedAt',
    'isApproved',
    'investorName',
    'note',
    'used',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'area',
    'rowId',
    'creatorId'
  ];
  tempData: any[] = [];
  uploadConfig: any;

  modalConfirmSubmit!: NzModalRef;

  constructor(
    private modalService: NzModalService,
    private balanceService: BalanceService,
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

  openSubmitForm(): void {
    this.modalConfirmSubmit = this.modalService.create({
      nzTitle: 'Confirm submit',
      nzContent: ConfirmSubmitComponent,
      nzData: {
        fields: this.tableFields
      },
      nzFooter: [
        {
          label: 'Close',
          onClick: () => this.modalConfirmSubmit.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: (contentComponentInstance) => {
            contentComponentInstance?.handleSubmit();
            if (contentComponentInstance?.confirmationForm.valid) {
              this.submitData(contentComponentInstance?.confirmationForm.value);
            }
          }
        },
      ]
    });
  }

  private submitData(config: any): void {
    if (this.tempData.length > 0) {
      this.isUploading = true;
      const payload = {
        env: config.env,
        isTruncateTable: config.isTruncateTable,
        data: this.tempData
      }
      const projectSubScr = this.balanceService.importProject(payload).subscribe(res => {
        if (res && res?.code === AppConstants.API_SUCCESS_CODE) {
          this.message.create('success', `Import success`);
          this.modalConfirmSubmit.destroy();
        } else {
          this.message.create('error', `Import failed, please check your file again!`);
          this.modalConfirmSubmit.destroy();
        }
      }, error => {
        this.message.create('error', `Import failed`);
        this.modalConfirmSubmit.destroy();
        this.isUploading = false;
      }, () => {
        this.isUploading = false;
      });

      this.unsubscribe.push(projectSubScr);
    }
  }

  onDownloadTemplate(): void {
    window.location.href = './assets/templates/Project.xlsx';
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    })
  }
}
