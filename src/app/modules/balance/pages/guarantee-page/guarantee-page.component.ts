import {Component, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {BalanceService} from '../../services';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FakeDbService} from '../../../../shared/services/fake-db.service';
import {ChoiceExcelComponent} from '../../../../shared/components/choice-excel/choice-excel.component';
import {AppConstants} from '../../../../app-constants';

@Component({
  selector: 'cons-guarantee-page',
  templateUrl: './guarantee-page.component.html',
  styleUrls: ['./guarantee-page.component.scss']
})
export class GuaranteePageComponent implements OnDestroy{
  private unsubscribe: Subscription[] = [];
  isUploading = false;

  tableFields: any[] = [];

  tempData: any[] = [];
  uploadConfig: any;

  currentTabIndex = 0;

  modalConfirmSubmit!: NzModalRef;

  constructor(
    private modalService: NzModalService,
    private balanceService: BalanceService,
    private message: NzMessageService,
    private fakeDbService: FakeDbService
  ) {
    this.initTableFields();
  }

  ngOnInit(): void {

  }

  private initTableFields(): void {
    // Reset data
    this.tempData = [];

    switch (this.currentTabIndex) {
      // Tab thong tin chung
      case 0:
        this.tableFields = [
          'code',
          'guaranteeObjectName',
          'investorABContractNumber',
          'guaranteeTypeName',
          'bankName',
          'investorABGuaranteeAmount',
          'effectiveAt',
          'endedAt',
          'maintenanceEndedAt',
          'note',
        ];
        break;
    }
  }

  handleChangeTab(tabIndex: number): void {
    this.currentTabIndex = tabIndex;
    this.initTableFields();
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

      this.tempData.forEach(e => {
        const foundGuaranteeType = this.fakeDbService.getGuaranteeTypes().find(el => el.name === e.guaranteeTypeName);
        if (foundGuaranteeType) {
          e.guaranteeTypeId = foundGuaranteeType.id;
        }

        const foundGuaranteeObject = this.fakeDbService.getGuaranteeObjects().find(el => el.name === e.guaranteeObjectName);
        if (foundGuaranteeObject) {
          e.guaranteeObjectId = foundGuaranteeObject.id;
        }

        const foundBank = this.fakeDbService.getBanks().find(el => el.name === e.bankName);
        if (foundBank) {
          e.bankId = foundBank.id;
        }
      });

    })
  }

  submitData(): void {
    if (this.tempData.length > 0) {
      this.isUploading = true;
      const payload = {
        env: 'dev',
        isTruncateTable: false,
        data: this.tempData
      }
      const projectSubScr = this.handleServiceAPI(payload).subscribe(res => {
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

  private handleServiceAPI(payload: any): Observable<any> {
    if (this.currentTabIndex === 0) {
      return this.balanceService.importGuarantee(payload);
    }

    return of(null);
  }

  onDownloadTemplate(): void {
    if (this.currentTabIndex === 0) {
      window.location.href = './assets/templates/BAOLANH_HD.xlsx';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    })
  }
}
