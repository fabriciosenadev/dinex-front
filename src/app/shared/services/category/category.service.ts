import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category/category.interface';
import { BaseService } from '../base/base.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  constructor(
    http: HttpClient,
    session: SessionService,
  ) { 
    super(http, session, 'categories')
  }

  listDeleted(): Observable<Category[]> {
    let route = `${this.apiUrl}/categories/deleted`;

    return this.http.get<Category[]>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  reactivate(id: number): Observable<Category> {
    let route = `${this.apiUrl}/categories/${id}/re-activate`;

    return this.http.put<Category>(
      route,
      null,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }
}
