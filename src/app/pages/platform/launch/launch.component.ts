import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { Category } from 'src/app/shared/models/category/category.model';
import { LaunchAndPayMethod } from 'src/app/shared/models/launch/launch-and-pay-method.model';
import { Launch } from 'src/app/shared/models/launch/launch.model';
import { LaunchAndPayMethodRegister } from 'src/app/shared/models/launch/register/launch-and-pay-method-register.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {
  // TODO: migrar este componente para o módulo de lançamentos

  categories: Category[] = [];
  launches: Launch[] = [];

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private notify: NotificationService,
    private router: Router,
    private headerService: HeaderService,
    private categoryService: CategoryService,
    private launchService: LaunchService,
  ) { }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = headerOptionsEnum.app;

    this.listCategories();
    this.listLastLaunches();
  }

  openCategoryPage(isRequiredOpenPage: boolean): void {
    if (isRequiredOpenPage) {
      this.router.navigate(['app/category']);
    }
  }

  listCategories(): void {
    this.categoryService.list().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.log(error);
      });
  }

  createLaunch(newLaunch: LaunchAndPayMethodRegister): void {
    this.launchService.create(newLaunch).subscribe(
      (result: LaunchAndPayMethod) => {
        if (result.launch.id) {
          this.notify.success('Sucesso', 'Lançamento criado!');
          this.listLastLaunches();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listLastLaunches(): void {
    this.launchService.listLastLaunches().subscribe(
      (launches: Launch[]) => {
        this.launches = launches;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
