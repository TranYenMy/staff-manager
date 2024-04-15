import {Component, OnDestroy} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {BalanceService} from "../../services";
import {NzMessageService} from "ng-zorro-antd/message";
import {ChoiceExcelComponent} from "../../../../shared/components/choice-excel/choice-excel.component";
import {AppConstants} from "../../../../app-constants";

@Component({
  selector: 'cons-fs-page',
  templateUrl: './fs-page.component.html',
  styleUrls: ['./fs-page.component.scss']
})
export class FsPageComponent implements OnDestroy{
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
        this.tableFields = [
          'projectCode',
          'creatorId',
          'note',
        ];
        break;
      case 1:
        this.tableFields = [
          'projectCode',
          'code',
          'area'
        ];
        break;
      case 2:
        this.tableFields = [
          'projectCode',
          'content',
          'startedAt',
          'endedAt'
        ];
        break;
      case 3:
        this.tableFields = [
          'projectCode',
          'expectedRevenueCode',
          'area',
          'unitPrice'
        ];
        break;
      case 4:
        this.tableFields = [
          'projectCode',
          'costItemCode',
          'area',
          'unitPrice'
        ];
        break;
    }
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

  handleChangeTab(tabIndex: number): void {
    this.currentTabIndex = tabIndex;
    this.initTableFields();
  }

  submitData(): void {
    if (this.tempData.length > 0) {
      this.isUploading = true;
      const payload = {
        env: 'dev',
        isTruncateTable: false,
        data: this.tempData,
        projectPlanningCode: []
      }

      if (this.currentTabIndex === 1) {
        const tempProjectPlanningCode: any[] = [];
        payload.data.forEach(item => {
          tempProjectPlanningCode.push(item.code);
        });
        payload.projectPlanningCode = this.removeDuplicates(tempProjectPlanningCode);
      }

      const importingSubScr = this.handleServiceAPI(payload)?.subscribe(res => {
        if (res && res?.code === AppConstants.API_SUCCESS_CODE) {
          this.message.create('success', `Import success`);
        } else {
          this.message.create('error', `Import failed, please check your file again!`);
        }
      }, error => {
        console.log(error);
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
      return this.balanceService.importFS01(payload);
    } else if (this.currentTabIndex === 1) {
      return this.balanceService.importFS02(payload);
    } else if (this.currentTabIndex === 2) {
      return this.balanceService.importFS03(payload);
    } else if (this.currentTabIndex === 3) {
      return this.balanceService.importFS04(payload);
    } else if (this.currentTabIndex === 4) {
      return this.balanceService.importFS05(payload);
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
      window.location.href = './assets/templates/FS01.xlsx';
    } else if (this.currentTabIndex === 1) {
      window.location.href = './assets/templates/FS02_1.xlsx';
    } else if (this.currentTabIndex === 2) {
      window.location.href = './assets/templates/FS-03.xlsx';
    } else if (this.currentTabIndex === 3) {
      window.location.href = './assets/templates/FS_04.xlsx';
    } else if (this.currentTabIndex === 4) {
      window.location.href = './assets/templates/FS_05.xlsx';
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
