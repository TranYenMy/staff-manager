import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_EXAMPLE_URL = `${environment.apiUrl}/transfer`;

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) {
  }

  importProject(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/project`, payload);
  }

  importFS01(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/fs01`, payload);
  }

  importFS02(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/fs02`, payload);
  }

  importFS03(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/fs03`, payload);
  }

  importFS04(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/fs04`, payload);
  }

  importFS05(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/fs05`, payload);
  }

  importGeneralEstimate(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/general-estimate`, payload);
  }

  importDetailEstimate(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/detail-estimate`, payload);
  }

  importGuarantee(payload: any[] = []): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/guarantee`, payload);
  }

  importFunctionalArea(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/functional-area`, payload);
  }

  importInvestorABContract(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/investor-ab-contract`, payload);
  }

  importInvestorABContractWorkItem(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/investor-ab-contract-work-item`, payload);
  }

  importInvestorABPaymentInstallment(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/investor-ab-payment-installment`, payload);
  }

  importInvestorABAnnexe(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/investor-ab-annexe`, payload);
  }

  importInvestorABAnnexeWorkItem(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/investor-ab-annexe-work-item`, payload);
  }

  importAdvancePaymentProfile(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/advance-payment-profile`, payload);
  }

  importAdvancePaymentProfileAnnexeMapping(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/advance-payment-profile-annexe-mapping`, payload);
  }

  importAdvancePaymentProfileGuaranteeMapping(payload: any): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/advance-payment-profile-guarantee-mapping`, payload);
  }
}
