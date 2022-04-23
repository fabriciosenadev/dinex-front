import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRegister } from '../../models/category/category-register.model';
import { Category } from '../../models/category/category.model';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;

  headers = { 
    Authorization: this.session.getToken()
  }

  constructor(
    private http: HttpClient,
    private session: SessionService,
    ) { }

  list() : Observable<Category[]> {
    let route = `${this.apiUrl}/categories`;

    return this.http.get<Category[]>(route, { headers: this.headers });
  }

  get(id: number) : Observable<Category> {
    let route = `${this.apiUrl}/categories/${id}`;

    return this.http.get<Category>(route, { headers: this.headers });
  }

  create(category: CategoryRegister) : Observable<Category> {
    let route = `${this.apiUrl}/categories`;

    return this.http.post<Category>(route, category, { headers: this.headers });
  }

  delete(id: number) : Observable<Category> {
    let route = `${this.apiUrl}/categories/${id}`;

    return this.http.delete<Category>(route, { headers: this.headers });
  }
}
