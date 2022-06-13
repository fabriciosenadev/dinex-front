import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs/internal/Observable';
import { LaunchAndPayMethodRegister } from '../../models/launch/register/launch-and-pay-method-register.model';
import { LaunchAndPayMethod } from '../../models/launch/launch-and-pay-method.model';
import { Launch } from '../../models/launch/launch.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  apiUrl = environment.apiUrl;

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
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  listLastLaunches(): Observable<Launch[]> {
    let route = `${this.apiUrl}/launches/last`;

    return this.http.get<Launch[]>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }
}
