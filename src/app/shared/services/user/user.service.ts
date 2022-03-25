import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { UserRegister } from '../../models/user/user-register.model';
import { User } from '../../models/user/user.model';
import { UserActivation } from '../../models/user/user-activation.model';

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

  constructor(private http: HttpClient) { }

  create(userRegister: UserRegister): Observable<User> {
    let route = `${this.apiUrl}/users`;
    
    return this.http.post<User>(route, userRegister);
  }

  requestActivationCode(activation: UserActivation): Observable<any> {
    let route =`${this.apiUrl}/activations/send-code`;

    return this.http.post(route, activation);
  }

  activateUser(activation: UserActivation): Observable<any> {
    let route = `${this.apiUrl}/activations/activate-account`;

    return this.http.post(route, activation);
  }
}
