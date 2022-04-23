import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {

  //Icons
  faPencil = faPencil;
  faSearch = faSearch;

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
    this.session.validateSession();

    this.headerOption = headerOptionsEnum.app;
  }

  openCategoryPage(isRequiredOpenPage: boolean) {
    if (isRequiredOpenPage) {
      this.router.navigate(['app/category']);
    }
  }

}
