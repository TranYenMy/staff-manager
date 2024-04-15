import {Component, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {BalanceService} from "../../services";
import {NzMessageService} from "ng-zorro-antd/message";
import {ChoiceExcelComponent} from "../../../../shared/components/choice-excel/choice-excel.component";
import {AppConstants} from "../../../../app-constants";

@Component({
  selector: 'cons-general-estimate-page',
  templateUrl: './general-estimate-page.component.html',
  styleUrls: ['./general-estimate-page.component.scss']
})
export class GeneralEstimatePageComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  isUploading = false;

  tableFields: string[] = [];
  tempData: any[] = [];
  uploadConfig: any;
  currentTabIndex = 0;

  constructor(
    private modalService: NzModalService,
    private balanceService: BalanceService,
    private message: NzMessageService
  ) {
    this.initTableFields();
  }

  private initTableFields(): void {
    // Reset data
    this.tempData = [];

    switch (this.currentTabIndex) {
      // Tab thong tin chung
      case 0:
        this.tableFields = [];
        break;
      case 1:
        this.tableFields = [
          'projectCode',
          'biddingPackageCode',
          'costItemCode',
          'preContingencyValue',
          'contingencyRateMaterialLaborCostEscalation',
          'contingencyValueMaterialLaborCostEscalation',
          'contingencyRateVolume',
          'contingencyValueVolume',
          'postContingencyValue',
          'note'
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

      const importingSubScr = this.handleServiceAPI(payload)?.subscribe(res => {
        if (res && res?.code === AppConstants.API_SUCCESS_CODE) {
          this.message.create('success', `Import success`);
        } else {
          this.message.create('error', `Import failed, please check your file again!`);
        }
      }, error => {
        this.message.create('error', `Import failed`);
        this.isUploading = false;
      }, () => {
        this.isUploading = false;
      });

      this.unsubscribe.push(importingSubScr);
    }
  }

  private handleServiceAPI(payload: any): Observable<any> {
    if (this.currentTabIndex === 0) {
      // return this.balanceService.importGeneralEstimate(payload);
    } else if (this.currentTabIndex === 1) {
      return this.balanceService.importGeneralEstimate(payload);
    }

    return of(null);
  }

  private removeDuplicates(arr: any) {
    return arr.reduce(function (acc: any, curr: any) {
      if (!acc.includes(curr))
        acc.push(curr);
      return acc;
    }, []);
  }

  onDownloadTemplate(): void {
    if (this.currentTabIndex === 0) {

    } else if (this.currentTabIndex === 1) {
      window.location.href = './assets/templates/KT_01.xlsx';
    } else if (this.currentTabIndex === 2) {

    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    });
  }

}
