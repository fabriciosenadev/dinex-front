import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs/internal/Observable';
import { LaunchAndPayMethodRegister } from '../../interfaces/launch/register/launch-and-pay-method-register.interface';
import { LaunchAndPayMethod } from '../../interfaces/launch/launch-and-pay-method.interface';
import { Launch } from '../../interfaces/launch/launch.interface';
import { LaunchResumeByYearAndMonth } from '../../interfaces/launch/launch-resume-by-year-and-month.interface';

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

  get(id: number): Observable<LaunchAndPayMethod> {
    let route = `${this.apiUrl}/launches/${id}`;

    return this.http.get<LaunchAndPayMethod>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  delete(id: number): Observable<null> {
    let route = `${this.apiUrl}/launches/${id}`;

    return this.http.delete<null>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  updateStatus(launchAndPayMethod: LaunchAndPayMethod, isJustStatus: boolean): Observable<Launch> {
    let route = `${this.apiUrl}/launches/${launchAndPayMethod.launch.id}`;

    return this.http.put<Launch>(
      route,
      launchAndPayMethod,
      {
        headers: {
          Authorization: this.session.getToken()
        },
        params: {
          isJustStatus
        }
      }
    );
  }

  getResumeByYearAndMonth(year: number, month: number): Observable<LaunchResumeByYearAndMonth> {
    let route = `${this.apiUrl}/launches/${year}/${month}/resume`;

    return this.http.get<LaunchResumeByYearAndMonth>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

}
