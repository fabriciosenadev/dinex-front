import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivateAccount } from '../../models/activation/activate-account.model';

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  requestActivationCode(activation: ActivateAccount): Observable<any> {
    let route = `${this.apiUrl}/activations/send-code`;

    return this.http.post(route, activation);
  }

  activateAccount(activation: ActivateAccount): Observable<any> {
    let route = `${this.apiUrl}/activations/activate-account`;

    return this.http.post(route, activation);
  }
}
