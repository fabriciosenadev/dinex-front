import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private notify: NotificationService,
    private router: Router,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    if(!this.session.sessionIsActive()){
      this.notify.warning("Ops!!!", "Faça login para acessar a página.");
      this.session.forceLogin();
    }

    this.headerOption = headerOptionsEnum.app;
  }

}
