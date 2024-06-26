import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  email: string = '';

  set userEmail(email: string) {
    this.userService.userRegister.email = email;
  }

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.site;
  }

  startUserRegister(): void {
    this.clearEmailSpace();
    this.userEmail = this.email;
    this.router.navigate(['/register']);
  }

  clearEmailSpace(): void {
    this.email = this.email.trim();
  }

}
