import {Component, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {BalanceService} from '../../services';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FakeDbService} from '../../../../shared/services/fake-db.service';
import {ChoiceExcelComponent} from '../../../../shared/components/choice-excel/choice-excel.component';
import {AppConstants} from '../../../../app-constants';

@Component({
  selector: 'cons-annexe-page',
  templateUrl: './annexe-page.component.html',
  styleUrls: ['./annexe-page.component.scss']
})
export class AnnexePageComponent implements OnDestroy{
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
          'investorABContractNumber',
          'investorABContractName',
          'code',
          'name',
          'signedAt',
          'effectiveAt',
          'startedAt',
          'endedAt',
          'taxRate',
          'performanceGuaranteeDuration',
          'advancePaymentGuaranteeDuration',
          'paymentGuaranteeDuration',
          'content',
          'advanceRate',
          'retentionRate',
          'guaranteeRate',
          'note',
        ];
        break;
      case 1:
        this.tableFields = [
          'investorABContractNumber',
          'functionalAreaCode',
          'costItemCode',
          'taskItemCode',
          'startedAt',
          'endedAt',
          'volume',
          'materialUnitPrice',
          'humanUnitPrice',
          'materialSubTotal',
          'humanSubTotal',
          'taxRate',
          'totalAmount',
        ];
        break;
      case 2:
        this.tableFields = [];
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
      return this.balanceService.importInvestorABAnnexe(payload);
    } else if (this.currentTabIndex === 1) {
      return this.balanceService.importInvestorABAnnexeWorkItem(payload);
    }

    return of(null);
  }

  onDownloadTemplate(): void {
    if (this.currentTabIndex === 0) {
      window.location.href = './assets/templates/PL_HD.xlsx';
    } else if (this.currentTabIndex === 1) {
      window.location.href = './assets/templates/HM_CV_PL_HD.xlsx';
    } else if (this.currentTabIndex === 2) {

    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    })
  }
}
