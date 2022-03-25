import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { successMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';

import { UserActivation } from 'src/app/shared/models/user/user-activation.model';
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

  pageTitle: string = 'Cadastro';

  userRegister: UserRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  userActivation: UserActivation = {
    email: '',
    activationCode: ''
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
        if (newUser?.id) {
          this.requestActivationCode({ email: newUser.email });
        }
      }, (error) => {
        let errors = error.error.errors;
        let errorTitle = 'Erro ao cadastrar';
        this.handleErrors(errorTitle, errors);
      }
    );

  }

  activateUser(event: any) {
    this.userActivation.activationCode = event;
    this.userService.activateUser(this.userActivation).subscribe(
      (response) => {
        console.log(response);

        this.notify.success('Conta ativada', successMessagesEnum.accountActivated);
        this.router.navigate(['/login']);
      }, (error) => {
        let errors = error.error.errors;
        // this.handleErrors(errors);
        console.error(error);
        this.notify.error('Erro inesperado', "algo deu errado, tente novamente mais tarde");
      }
    );
  }

  requestActivationCode(activation: UserActivation) {
    this.userService.requestActivationCode(activation).subscribe(
      (response) => {
        console.log(response);
        this.userActivation.email = activation.email;
        
        if (response?.message) {
          this.pageTitle = 'Ative sua conta';
          this.activateAccount = true;
          let successTitle = 'Sucesso';
          this.notify.success(successTitle, successMessagesEnum.register);
        }
      }, (error) => {
        console.error(error);
        this.notify.error('Erro inesperado', "algo deu errado, tente novamente mais tarde");
      }
    );
  }

  showActivateAccount(): void {
    this.activateAccount = true;
  }

  handleErrors(title:string, errors: any): void {
    if (errors?.Email) {
      errors.Email.forEach((msg: string) => {
        this.notify.error(title, msg);
      });
    }
  }
}
