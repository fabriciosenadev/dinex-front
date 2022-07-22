import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { SuccessMessagesEnum } from 'src/app/shared/helpers/Enums/successMessagesEnum';
import { ActivateAccount } from 'src/app/shared/interfaces/activation/activate-account.interface';
import { ActivationService } from 'src/app/shared/services/activation/activation.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  activationData: ActivateAccount = {
    email: '',
    activationCode: '',
  };

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private activationService: ActivationService,
  ) { }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.site;

    this.activationData.activationCode = this.currentRoute.snapshot.paramMap.get('activationCode');
  }

  activateAccount(event: any) {
    this.activationData.email = event;

    this.activationService.activateAccount(this.activationData).subscribe(
      (response) => {
        this.notify.success('Conta ativada', SuccessMessagesEnum.accountActivated);
        this.router.navigate(['/login']);
      }, (error) => {
        console.error(error);
        this.router.navigate(['/']);
        this.notify.error('Erro para ativar', "link incorreto ou invalido.");
      });
  }

}
