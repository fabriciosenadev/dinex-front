import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../interfaces/user/user.interface';
import { SessionService } from '../session/session.service';
import { UserAmountAvailable } from '../../interfaces/user/user-amount-available';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  private _userRegister = new BehaviorSubject<User>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  get userRegister(): User {
    return this._userRegister.value;
  };
  set userRegister(userRegister: User) {
    this._userRegister.next(userRegister);
  };

  constructor(
    public override http: HttpClient,
    public override session: SessionService,
  ) {
    super(http, session, 'users');
  }

  getUser(): Observable<User> {
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
