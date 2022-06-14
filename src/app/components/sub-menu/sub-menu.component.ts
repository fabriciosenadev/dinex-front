import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  //Icons
  faPencil = faPencil;
  faSearch = faSearch;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToLaunch() {
    this.router.navigate(['/app/launching/new']);
  }

}
