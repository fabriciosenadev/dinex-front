import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Observable } from 'rxjs/internal/Observable';
import { LaunchAndPayMethod } from '../../interfaces/launch/launch-and-pay-method.interface';
import { Launch } from '../../interfaces/launch/launch.interface';
import { LaunchResumeByYearAndMonth } from '../../interfaces/launch/launch-resume-by-year-and-month.interface';
import { LaunchDetailsByYearAndMonth } from '../../interfaces/launch/launch-details-by-year-and-month.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchService extends BaseService<LaunchAndPayMethod> {

  constructor(
    http: HttpClient,
    session: SessionService,
  ) { 
    super(http, session, 'launches');
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

  update(launchAndPayMethod: LaunchAndPayMethod, isJustStatus: boolean): Observable<Launch> {
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

  getDetailsByYearAndMonth(year: number, month: number): Observable<LaunchDetailsByYearAndMonth> {
    let route = `${this.apiUrl}/launches/${year}/${month}/details`;

    return this.http.get<LaunchDetailsByYearAndMonth>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

}
