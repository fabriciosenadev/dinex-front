import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { successMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';
import { UserActivation } from 'src/app/shared/models/user/user-activation.model';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userActivation: UserActivation = {
    email: '',
    activationCode: '',
  };

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.site;

    this.userActivation.activationCode = this.currentRoute.snapshot.paramMap.get('activationCode');
  }

  activateAccount(event: any) {
    this.userActivation.email = event;

    this.userService.activateAccount(this.userActivation).subscribe(
      (response) => {
        this.notify.success('Conta ativada', successMessagesEnum.accountActivated);
        this.router.navigate(['/login']);
      }, (error) => {
        console.error(error);
        this.notify.error('Erro inesperado', "verifique se o link está correto e tente novamente.");
      });
  }

}
