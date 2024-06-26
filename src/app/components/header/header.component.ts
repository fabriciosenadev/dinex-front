import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faArrowRightFromBracket, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Icons
  faHome = faHome;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUserGear = faUserGear;

  headerOptionsEnum = HeaderOptionsEnum;

  get headerOption(): HeaderOptionsEnum{
    return this.headerService.headerOption;
  }

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
  }

  assets(partialPathImg: string) {
    return `/assets/${partialPathImg}`;
  }

  goHomeAction() {
    this.router.navigate(['']);
  }

  goLoginAction() {
    this.router.navigate(['login']);
  }

  goRegisterAction() {
    this.router.navigate(['register']);
  }

  goLogoutAction() {
    this.sessionService.endSession();
    this.router.navigate(['login']);
  }

  goMainAction() {
    this.router.navigate(['app/']);
  }

  goUserSettings() {
    this.router.navigate(['app/user-settings']);
  }

}
