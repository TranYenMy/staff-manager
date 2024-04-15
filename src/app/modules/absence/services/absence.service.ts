import {Injectable} from '@angular/core';
import {Absence} from "../models/absence";
import {BehaviorSubject, from, Observable, of, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}
const API_URL = `${environment.apiUrl}/v1`;

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  listOfData: Absence[] = [];

  private unsubscribe: Subscription[] = [];

  constructor(private http: HttpClient) {


  }

  // @ts-ignore
  addAbsenceRequest(payload: any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${API_URL}/absencerequest/add`, payload);
  }

  updateRequest(id: number | undefined, payload: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/absencerequest/update/${id}`, payload);
  }

  getDayRemain(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/absencerequest/dayremain/${id}`)
  }


  getAbsenceGroupType(): Observable<any> {
    return this.http.get<any>(`${API_URL}/groupabsencetype/search`);
  }

  getAbsenceType(): Observable<any> {
    return this.http.get<any>(`${API_URL}/absencetype/search`);
  }

  getEmailRelated(): Observable<any> {
    return this.http.get<any>(`${API_URL}/staff/emailrelated`);
  }

  searchUserByName(): (name: string) => Observable<any> {
    return (name: string): Observable<any> =>
      this.http
        .get(`${API_URL}/staff/filterbyname`, {params: {name}})
        .pipe(
          catchError(() => of({ body: [] })),
          map((res: any) => res.body)
        );
  }

  mailRequest(payload: any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${API_URL}/mail/request`, payload);
  }

  changeStatus(id: number, payload?: any): Observable<any> {
    // @ts-ignore
    return this.http.put<any>(`${API_URL}/absencerequest/changestatus/${id}`, payload)
  }

  getAbsenceHistory(from: String, to: String, status: string): Observable<any> {
    // @ts-ignore
    let params = new HttpParams()
      .set('from', from.toString())
      .set('to', to.toString())
      .set('status', status);


    return this.http.get<any>(`${API_URL}/absencerequest/myabsencehistory`, {params: params});
  }


  // getAbsenceList(): Absence[] {
  //   return this.listOfData;
  // }
  //
  // getAbsenceDetail(absenceId: any): Absence | undefined {
  //   return this.listOfData.find(e => e.id === absenceId);
  // }

  //
  // addNew(data: Absence): void {
  //   this.listOfData.push(data);
  // }
  //
  // update(data: Absence): void {
  //   this.listOfData.forEach(item => {
  //     if (item.id === data.id) {
  //       item.startDate = data.startDate;
  //       item.endDate = data.endDate;
  //       item.quantity = data.quantity;
  //       item.reason = data.reason;
  //       item.startDate = data.startDate;
  //     }
  //   });
  // }
}
