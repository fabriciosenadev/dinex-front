import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';

import { UserRegister } from 'src/app/shared/models/user/user-register.model';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  activateAccount: boolean = false;

  userRegister: UserRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  get userEmailRegister() {
    return this.userService.userRegister.email;
  }

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.site;
    this.userRegister.email = this.userEmailRegister;
  }

  onSubmit(registerUserFormData: any) {
    this.userRegister = registerUserFormData;

    this.userService.create(this.userRegister).subscribe(
      (newUser) => {
        if(newUser?.id) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  showActivateAccount(): void {
    this.activateAccount = true;
  }

}
