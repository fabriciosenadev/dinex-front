import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { UserRegister } from '../../interfaces/user/user-register.interface';
import { User } from '../../interfaces/user/user.interface';
import { SessionService } from '../session/session.service';
import { UserAmountAvailable } from '../../interfaces/user/user-amount-available';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = environment.apiUrl;

  private _userRegister = new BehaviorSubject<UserRegister>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  get userRegister(): UserRegister {
    return this._userRegister.value;
  };
  set userRegister(userRegister: UserRegister) {
    this._userRegister.next(userRegister);
  };

  constructor(
    private http: HttpClient,
    private session: SessionService,
    ) { }

  create(userRegister: UserRegister): Observable<User> {
    let route = `${this.apiUrl}/users`;
    
    return this.http.post<User>(route, userRegister);
  }

  get(): Observable<User> {
    let route = `${this.apiUrl}/users`;
    return this.http.get<User>(
        route, 
        { 
          headers: {
            Authorization: this.session.getToken()
          } 
        }
      );
  }

  getUserAmountAvailable(): Observable<UserAmountAvailable> {
    let route = `${this.apiUrl}/users/amount-available`;

    return this.http.get<UserAmountAvailable>(
      route, 
      { 
        headers: {
          Authorization: this.session.getToken()
        } 
      }
    );
  }

}
