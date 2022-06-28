import { Component, OnInit } from '@angular/core';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { SessionService } from 'src/app/shared/services/session/session.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { successMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared/interfaces/user/user-login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private sessionService: SessionService,
    private notify: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.login;
  }

  onSubmit(loginUserFormData: UserLogin): void {
    this.sessionService.login(loginUserFormData).subscribe(
      (response) => {
        this.sessionService.startSession(response.token);
        this.notify.success("Login realizado", successMessagesEnum.loginSuccess);
        this.router.navigate(['/app/main']);
      }, (error) => {
        let errors = error.error;
        let errorTitle = "Erro ao realizar login";
        this.handleErrors(errorTitle, errors);
      }
    );
  }

  handleErrors(title: string, errors: any): void {
    if (errors?.message) {
      this.notify.error(title, errors.message);
    }
  }

}
