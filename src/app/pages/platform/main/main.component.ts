import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private session: SessionService,
    private notify: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(!this.session.sessionIsActive()){
      this.notify.warning("Ops!!!", "Faça login para acessar a página.");
      this.session.forceLogin();
    }
  }

}
