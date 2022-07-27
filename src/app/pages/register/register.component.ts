import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { SuccessMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ActivationService } from 'src/app/shared/services/activation/activation.service';
import { UserRegister } from 'src/app/shared/interfaces/user/user-register.interface';
import { ActivateAccount } from 'src/app/shared/interfaces/activation/activate-account.interface';
import { Notifications } from 'src/app/shared/extensions/notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Notifications implements OnInit {

  activateAccount: boolean = false;

  pageTitle: string = 'Cadastro';

  userRegister: UserRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  get userEmailRegister() {
    return this.userService.userRegister.email;
  }

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private router: Router,
    private activationService: ActivationService,
    public override notify: NotificationService,
  ) {
    super(notify);
  }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.site;
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

  requestActivationCode(activation: ActivateAccount) {
    this.activationService.requestActivationCode(activation).subscribe(
      (response) => {
        if (response?.message) {

          this.pageTitle = 'Ative sua conta';
          this.activateAccount = true;

          this.handleSuccess(SuccessMessagesEnum.register);
        }
      }, (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

  showActivateAccount(): void {
    this.activateAccount = true;
  }

  handleErrors(title: string, errors: any): void {
    if (errors?.Email) {
      errors.Email.forEach((msg: string) => {
        this.notify.error(title, msg);
      });
    }
  }
}
