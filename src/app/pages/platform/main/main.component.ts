import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userFirstName: string = '';

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private notify: NotificationService,
    private router: Router,
    private headerService: HeaderService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = headerOptionsEnum.app;
    setTimeout(() => {
      this.getUser();
    }, 100);
  }

  getUser(): void {
    this.userService.get().subscribe(
      (user) => {
        this.userFirstName = user.fullName.split(' ')[0];
      },
      (err) => {
        console.log(err);
        let title = 'Error';
        let message = 'Error ao obter usuario';
        this.notify.error(title, message);
      }
    );
  }

  showResume() {

  }

}
