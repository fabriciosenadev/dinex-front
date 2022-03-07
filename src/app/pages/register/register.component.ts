import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { successMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';

import { UserRegister } from 'src/app/shared/models/user/user-register.model';

import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
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
    private notify: NotificationService,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.site;
    this.userRegister.email = this.userEmailRegister;
  }

  onSubmit(registerUserFormData: UserRegister) {
    this.userService.create(registerUserFormData).subscribe(
      (newUser) => {
        if(newUser?.id) {
          let successTitle = 'Sucesso';
          this.notify.success(successTitle, successMessagesEnum.register);

          // TODO: need to implement activation account
          //this.router.navigate(['/login']);

        }
      }, (error) => {
        let errors = error.error.errors;
        this.handleErrors(errors);
      }
    );
      
  }

  showActivateAccount(): void {
    this.activateAccount = true;
  }

  handleErrors(errors: any): void {
    let errorTitle = 'Erro ao cadastrar';

    if(errors?.Email)
    {
      errors.Email.forEach( (msg: string) => {
        this.notify.error(errorTitle, msg);
      });
    }
  }
}
