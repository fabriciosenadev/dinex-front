import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { HeaderService } from 'src/app/shared/services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerOptionsEnum = headerOptionsEnum;

  get headerOption(): headerOptionsEnum{
    return this.headerService.headerOption;
  }

  constructor(
    private router: Router,
    private headerService: HeaderService,
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

}
