import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../../models/user/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

    login(userLogin: UserLogin): Observable<any> {
      let route = `${this.apiUrl}/authentications`;

      return this.http.post<any>(route, userLogin);
    }

    sessionIsActive(): boolean {
      return localStorage.getItem('representationData') ? true : false;
    }

    forceLogin(): void {
      this.endSession();
      this.router.navigate(['/login']);
    }

    startSession(token: string): void {
      localStorage.setItem('representationData', token);
    }

    endSession(): void {
      localStorage.removeItem('representationData');
    }
}
