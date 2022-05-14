import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs/internal/Observable';
import { LaunchAndPayMethodRegister } from '../../models/launch/register/launch-and-pay-method-register.model';
import { LaunchAndPayMethod } from '../../models/launch/launch-and-pay-method.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  apiUrl = environment.apiUrl;

  headers = {
    Authorization: this.session.getToken()
  }

  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) { }

  create(launchAndPayMethod: LaunchAndPayMethodRegister): Observable<LaunchAndPayMethod> {
    let route = `${this.apiUrl}/launches`;

    return this.http.post<LaunchAndPayMethod>(
      route,
      launchAndPayMethod,
      {
        headers: this.headers
      }
    );
  }
}
