import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../../models/user/user-login.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private notify: NotificationService,
    ) { }

    login(userLogin: UserLogin): Observable<any> {
      let route = `${this.apiUrl}/authentications`;

      return this.http.post<any>(route, userLogin);
    }

    private sessionIsActive(): boolean {
      return localStorage.getItem('representationData') ? true : false;
    }

    private forceLogin(): void {
      this.endSession();
      this.router.navigate(['/login']);
    }

    public startSession(token: string): void {
      localStorage.setItem('representationData', token);
    }

    public endSession(): void {
      localStorage.removeItem('representationData');
    }

    public validateSession(): void {
      if (!this.sessionIsActive()) {
        this.notify.warning("Ops!!!", "Faça login para acessar a página.");
        this.forceLogin();
      }
    }

    public getToken() {
      let token = localStorage.getItem('representationData');
      return 'Bearer ' + token;
    }
}
