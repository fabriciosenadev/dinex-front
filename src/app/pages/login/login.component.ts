import { Component, OnInit } from '@angular/core';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { SessionService } from 'src/app/shared/services/session/session.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared/interfaces/user/user-login.interface';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { UserLoginEnum } from 'src/app/shared/interfaces/user/enums/userEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Notifications implements OnInit {

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private sessionService: SessionService,
    public override notify: NotificationService,
    private router: Router,
  ) { 
    super(notify)
  }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.login;
  }

  onSubmit(loginUserFormData: UserLogin): void {
    this.sessionService.login(loginUserFormData).subscribe(
      (response) => {
        this.sessionService.startSession(response.token);
        this.handleSuccess(UserLoginEnum.successToLogin);
        this.router.navigate(['/app/main']);
      }, (error) => {
        // let errorTitle = "Erro ao realizar login";
        this.handleError(error);
      }
    );
  }
}
