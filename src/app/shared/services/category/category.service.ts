import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRegister } from '../../interfaces/category/category-register.interface';
import { Category } from '../../interfaces/category/category.interface';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) { }

  list(): Observable<Category[]> {
    let route = `${this.apiUrl}/categories`;

    return this.http.get<Category[]>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
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

  get(id: number): Observable<Category> {
    let route = `${this.apiUrl}/categories/${id}`;

    return this.http.get<Category>(
      route,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  create(category: CategoryRegister): Observable<Category> {
    let route = `${this.apiUrl}/categories`;

    return this.http.post<Category>(
      route,
      category,
      {
        headers: {
          Authorization: this.session.getToken()
        }
      }
    );
  }

  delete(id: number): Observable<Category> {
    let route = `${this.apiUrl}/categories/${id}`;

    return this.http.delete<Category>(
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
