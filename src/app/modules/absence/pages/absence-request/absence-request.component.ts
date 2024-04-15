import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import {AbsenceService} from "../../services/absence.service";
import {Absence} from "../../models/absence";
import {BehaviorSubject, debounceTime, first, Observable, of, Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import * as m from 'moment';
import * as _ from 'lodash';
import {extendMoment} from 'moment-range';
import {duration} from "moment";

// Siete delle merde
const moment = extendMoment(m);


@Component({
  selector: 'cons-absence-request',
  templateUrl: './absence-request.component.html',
  styleUrls: ['./absence-request.component.scss']
})
export class AbsenceRequestComponent implements OnChanges {
  private unsubscribe: Subscription[] = [];
  isUploading = false;
  hasError: boolean = false;
  absenceRequestForm?: FormGroup;
  listGroup: any;
  listType: any;
  listTypeByGroup: any[] = [];
  note: string = '';
  showFullTime: boolean = false;
  userName: string = '';
  mngName: string = '';
  hrName: string = '';
  durationDay?: number;
  inputValue: string = '';
  @Input() absence?: Absence;
  dateType = [
    {id: 1, text: 'Full Day'},
    {id: 2, text: 'Morning'},
    {id: 3, text: 'Afternoon'},
  ]

  searchChange$ = new BehaviorSubject('');
  optionList: any[] = [];
  isLoading = false;


  constructor(private fb: FormBuilder,
              private absenceService: AbsenceService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.initData();
  }


  ngOnInit(): void {
    this.initForm();

    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(this.absenceService.searchUserByName()));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.absence && this.absence) {
      this.absenceRequestForm?.patchValue(this.absence);
    }
  }

  initForm() {
    this.absenceRequestForm = this.fb.group({
      groupType: new FormControl(1, Validators.compose([Validators.required])),
      absenceType: new FormControl(null, Validators.compose([Validators.required])),
      numAbsence: new FormControl(null, Validators.compose([Validators.required])),
      startDate: new FormControl(null, Validators.compose([Validators.required])),
      endDate: new FormControl(null, Validators.compose([Validators.required])),
      reason: new FormControl(null, Validators.compose([Validators.required])),
      detailLeave: this.fb.array([]),
      isFull: new FormControl(null),
      informToStaffList: []
    });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  addItem(date: Date): void {
    // @ts-ignore
    const add = this.absenceRequestForm.get('detailLeave') as FormArray;
    add.push(this.fb.group({
      day: [{value: date, disabled: true}],
      kind: new FormControl(null),
    }))
  }

  handleDateChange(event: any): void {
    // @ts-ignore
    const fromDate = this.absenceRequestForm.get('startDate')?.getRawValue();
    // @ts-ignore
    const toDate = this.absenceRequestForm.get('endDate')?.getRawValue();
    // @ts-ignore
    const arrayForm = this.absenceRequestForm.get('detailLeave') as FormArray;
    arrayForm.controls = [];
    if (fromDate && toDate) {
      const differenceInDays = (toDate - fromDate) / 86400000;
      if (differenceInDays >= 1) {
        this.showFullTime = true;
        // @ts-ignore
        let dates = this.getAllDates(moment(_.cloneDeep(fromDate)), moment(_.cloneDeep(toDate)));
        for (let index = 0; index < (Math.floor(differenceInDays)) + 1; index++) {
          this.addItem(new Date(dates[index]));
        }
      }
      this.durationDay = Math.floor((toDate - fromDate) / 86400000) + 1;

      if (Math.floor(differenceInDays) === 0) {
        this.showFullTime = true;
        this.addItem(toDate);
      }
    }
  }

  get detailLeave(): FormArray {
    // @ts-ignore
    return <FormArray>this.absenceRequestForm.get('detailLeave');
  }

  private initData(): void {
    this.absenceService.getAbsenceGroupType().subscribe(res => {
      if (res && res.body) {
        this.listGroup = res.body;
      }
    });


    this.absenceService.getAbsenceType().subscribe(res => {
      if (res && res.body) {
        this.listType = res.body;
        this.listTypeByGroup = res.body.filter(function (obj: { id: number; }) {
          return obj.id == 1;
        });

        console.log('this.listTypeByGroup', this.listTypeByGroup);
      }
    })


    this.absenceService.getEmailRelated().subscribe(res => {
      if (res.responseCode === '200') {
        this.mngName = res.body.emailmgr;
        this.hrName = res.body.emailhr[0];
      }
    })

    const storage: any = localStorage.getItem('auth');
    this.userName = JSON.parse(storage)?.userName;
    console.log(storage);
  }

  onSelectedGroup() {
    this.listTypeByGroup = [];
    // @ts-ignore
    const selectedValue = this.absenceRequestForm.get('groupType')?.getRawValue();
    for (const item of this.listType) {
      if (item.groupAbsenceTypeId == selectedValue) {
        this.listTypeByGroup.push(item);
      }
    }
    this.note = this.listTypeByGroup[0].note;
    console.log(this.listTypeByGroup);
  }

  onSelectedAbsenceType() {
    // @ts-ignore
    /*const selectedValue = this.absenceRequestForm.get('absenceType')?.getRawValue();
    this.note = this.listType.filter(function (obj: { id: any; }) {
        return obj.id == selectedValue;
    })
        .map(function (obj: { note: any; }) {
            return obj.note;
        });
    console.log(selectedValue);*/


    console.log("absenceType value", this.absenceRequestForm?.get("absenceType")?.value);
    if (this.absenceRequestForm?.get("absenceType")?.value) {
      // const foundAbsenceType = this.listTypeByGroup.find(el => String(el.id) === String(this.absenceRequestForm?.get("absenceType")?.value));
      // if (foundAbsenceType) {
      const id = this.absenceRequestForm?.get("absenceType")?.value;
      this.absenceService.getDayRemain(id).subscribe(res => {
        if (res?.responseCode === '200') {
          this.absenceRequestForm?.get("numAbsence")?.setValue(res.body);
        }
      });
    }
    // }

  }

  // save(form: FormGroup): void {
  //   const {valid, value} = form;
  //   console.log(valid);
  //
  //   const foundAbsenceType = this.listTypeByGroup.find(el => String(el.id) === String(this.absenceRequestForm?.get("absenceType")?.value));
  //
  //   const data = form.getRawValue();
  //   data.detailLeave = JSON.stringify(data.detailLeave);
  //   data.absenceType = foundAbsenceType;
  //   data.startDate = moment(data.startDate).format('YYYY-MM-DD');
  //   data.endDate = moment(data.endDate).format('YYYY-MM-DD');
  //   data.informToStaffList = data.informToStaffList.map((item: number) => {
  //     return {id: item};
  //   })
  //   const payload = {
  //     body: data
  //   }
  //   if (valid) {
  //
  //     if (this.absence && this.absence?.id) {
  //       this.hasError = false;
  //       const addAbsenceRequestSubcr = this.absenceService
  //         .addAbsenceRequest(payload)
  //         .pipe(first())
  //         .subscribe(() => {
  //           alert('save thành công')
  //         });
  //       this.unsubscribe.push(addAbsenceRequestSubcr);
  //     }else {
  //       const updateAbsenceRequestSubcr = this.absenceService
  //         .updateRequest(this.absence?.id, payload)
  //         .pipe(first())
  //         .subscribe(() => {
  //           console.log('update thành công');
  //         });
  //       this.unsubscribe.push(updateAbsenceRequestSubcr);
  //     }
  //   }
  // }

  save(form: FormGroup): void {
    const {valid, value} = form;
    console.log(valid);

    const foundAbsenceType = this.listTypeByGroup.find(el => String(el.id) === String(this.absenceRequestForm?.get("absenceType")?.value));

    const data = form.getRawValue();
    data.detailLeave = JSON.stringify(data.detailLeave);
    data.absenceType = foundAbsenceType;
    data.startDate = moment(data.startDate).format('YYYY-MM-DD');
    data.endDate = moment(data.endDate).format('YYYY-MM-DD');
    data.informToStaffList = data.informToStaffList.map((item: number) => {
      return {id: item};
    })

    const payload = {
      body: data
    }

    if (valid) {
      this.hasError = false;

      const addAbsenceRequestSubcr = this.absenceService
        .addAbsenceRequest(payload)
        .pipe(first())
        .subscribe(() => {
          console.log('save thành công')
        });
      this.unsubscribe.push(addAbsenceRequestSubcr);
    }
  }



  onDiscard() {
    this.router.navigateByUrl("/absence/listAbsence")
  }

  onSubmit(form: FormGroup): void {
    const {valid, value} = form;
    console.log(valid);

    const foundAbsenceType = this.listTypeByGroup.find(el => String(el.id) === String(this.absenceRequestForm?.get("absenceType")?.value));

    const data = form.getRawValue();
    data.detailLeave = JSON.stringify(data.detailLeave);
    data.absenceType = foundAbsenceType;
    data.startDate = moment(data.startDate).format('YYYY-MM-DD');
    data.endDate = moment(data.endDate).format('YYYY-MM-DD');
    data.informToStaffList = data.informToStaffList.map((item: number) => {
      return {id: item};
    })

    const payload = {
      body: data
    }

    if (valid) {
      this.hasError = false;
      const addAbsenceRequestSubcr = this.absenceService
        .addAbsenceRequest(payload)
        .pipe(first())
        .subscribe((res) => {
          if (res.responseCode === '200') {
            const id = res.body.id;
            console.log(id);
            this.changeStatus(id);
            this.sendMailRequest();
            this.router.navigateByUrl("")

          }

        });
      this.unsubscribe.push(addAbsenceRequestSubcr);
    }
  }


  changeStatus(id: number): void {
    if (id) {
      const payload = {
        body: {
          status: 'Submitted'
        }
      };

      console.log(id);
      this.absenceService.changeStatus(id, payload).subscribe(() => {
      })
    }
  }

  sendMailRequest(): void {
    const payload = {
      body: {
        toEmail: this.mngName,
        listCCEmail: [],
        link: "http://localhost:4200/absence/create"
      }
    }
    this.absenceService.mailRequest(payload).subscribe(res => {
      if (res.responseCode === '200') {
        res.body;
      }
    })

  }


  getAllDates(startDate: any, endDate: any): any[] {
    let now = startDate.clone();
    const dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(moment(now).format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  }

  onChangeIsFullDay(): void {
    if (this.absenceRequestForm?.get('isFull')?.value === true) {
      this.detailLeave.controls.forEach(control => {
        control.get('kind')?.setValue(this.dateType[0].id);
      })
    }
  }

  updateRequest(form: FormGroup, id: number): void {
    const {valid, value} = form;
    console.log(valid);

    const foundAbsenceType = this.listTypeByGroup.find(el => String(el.id) === String(this.absenceRequestForm?.get("absenceType")?.value));

    const data = form.getRawValue();
    data.detailLeave = JSON.stringify(data.detailLeave);
    data.absenceType = foundAbsenceType;
    data.startDate = moment(data.startDate).format('YYYY-MM-DD');
    data.endDate = moment(data.endDate).format('YYYY-MM-DD');
    data.informToStaffList = data.informToStaffList.map((item: number) => {
      return {id: item};
    })

    const payload = {
      body: data
    }

    if (valid) {
      this.hasError = false;

      const updateAbsenceRequestSubcr = this.absenceService
        .updateRequest(id, payload)
        .pipe(first())
        .subscribe(() => {
        });
      this.unsubscribe.push(updateAbsenceRequestSubcr);
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe.forEach(s => {
      s.unsubscribe();
    })
  }

  protected readonly duration = duration;
}



