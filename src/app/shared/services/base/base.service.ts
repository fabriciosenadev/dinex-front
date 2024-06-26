import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';
import { User } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TModel> {

  apiUrl = environment.apiUrl;
  route: string = '';

  constructor(
    protected http: HttpClient,
    protected session: SessionService,
    @Inject('route') protected receivedRoute: string,
  ) {
    this.route = receivedRoute;
  }

  create(creationData: TModel): Observable<TModel> {
    let route = `${this.apiUrl}/${this.route}`;

    return this.http.post<TModel>(
      route,
      creationData,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  get(id: number): Observable<TModel> {
    let route = `${this.apiUrl}/${this.route}/${id}`;
    return this.http.get<TModel>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  list(): Observable<TModel[]> {
    let route = `${this.apiUrl}/${this.route}`;

    return this.http.get<TModel[]>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  delete(id: number): Observable<TModel> {
    let route = `${this.apiUrl}/${this.route}/${id}`;

    return this.http.delete<any>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }
}
