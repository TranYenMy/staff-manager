import {Component, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {BalanceService} from '../../services';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ChoiceExcelComponent} from '../../../../shared/components/choice-excel/choice-excel.component';
import {AppConstants} from '../../../../app-constants';
import {FakeDbService} from '../../../../shared/services/fake-db.service';

@Component({
  selector: 'cons-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.scss']
})
export class ContractPageComponent implements OnDestroy{
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
          'projectCode',
          'projectTradeCode',
          'projectName',
          'investorName',
          'contractNumber',
          'name',
          'biddingPackageCode',
          'investorTaxCode',
          'contractorName',
          'signedAt',
          'effectiveAt',
          'startedAt',
          'endedAt',
          'contractTypeName',
          'contractFormName',
          'taxRate',
          'maintenanceGuaranteeDuration',
          'content',
          'advanceRate',
          'milestoneDeduction',
          'retentionRate',
          'guaranteeRate',
          'note'
        ];
        break;
      case 1:
        this.tableFields = [
          'contractNumber',
          'functionalAreaCode',
          'costItemCode',
          'costItemName',
          'taskItemCode',
          'volume',
          'materialUnitPrice',
          'humanUnitPrice',
          'materialSubTotal',
          'humanSubTotal',
          'taxRate',
          'discountAmount',
          'totalAmount'
        ];
        break;
      case 2:
        this.tableFields = [
          'investorABContractNumber',
          'milestone',
          'rate',
          'Amount',
          'numberOfDays',
          'requestedAt',
          'completionRate',
          'explaination'
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
        const foundContractor = this.fakeDbService.getPartners().find(el => el.name === e.contractorName);
        if (foundContractor) {
          e.contractorId = foundContractor.id;
        }

        const foundContractForm =  this.fakeDbService.getContractForms().find(el => el.name === e.contractFormName);
        if (foundContractForm) {
          e.contractFormId = foundContractForm.id;
        }

        const foundContractType=  this.fakeDbService.getContractTypes().find(el => el.name === e.contractTypeName);
        if (foundContractType) {
          e.contractTypeId = foundContractType.id;
        }

        const foundInvestor=  this.fakeDbService.getPartners().find(el => el.name === e.investorName);
        if (foundInvestor) {
          e.investorId = foundInvestor.id;
        }

        const paymentDocumentForm =  this.fakeDbService.getPaymentDocumentForms().find(el => el.name === e.investorName);
        if (paymentDocumentForm) {
          e.paymentDocumentFormId = paymentDocumentForm.id;
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
      return this.balanceService.importInvestorABContract(payload);
    } else if (this.currentTabIndex === 1) {
      return this.balanceService.importInvestorABContractWorkItem(payload);
    } else if (this.currentTabIndex === 2) {
      return this.balanceService.importInvestorABPaymentInstallment(payload);
    }

    return of(null);
  }

  onDownloadTemplate(): void {
    if (this.currentTabIndex === 0) {
      window.location.href = './assets/templates/TTC_HD.xlsx';
    } else if (this.currentTabIndex === 1) {
      window.location.href = './assets/templates/HM_CONG_VIEC_HD.xlsx';
    } else if (this.currentTabIndex === 2) {
      window.location.href = './assets/templates/DOT_TT_HD.xlsx';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    })
  }
}
