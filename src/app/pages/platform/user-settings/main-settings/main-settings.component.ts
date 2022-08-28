import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.css']
})
export class MainSettingsComponent extends Notifications implements OnInit {

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    notify: NotificationService,
  ) { 
    super(notify)
  }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.app;
  }

}
