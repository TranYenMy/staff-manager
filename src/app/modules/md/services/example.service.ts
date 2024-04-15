import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_EXAMPLE_URL = `${environment.apiUrl}/example`;

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient) {
  }

  bulkImport(payload: any[] = []): Observable<any> {
    return this.http.post<any>(`${API_EXAMPLE_URL}/import`, payload);
  }
}
