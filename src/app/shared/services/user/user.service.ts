import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from '../../models/user/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
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
}
