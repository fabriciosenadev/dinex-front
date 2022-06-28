import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
import { LaunchAndPayMethodRegister } from 'src/app/shared/interfaces/launch/register/launch-and-pay-method-register.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-new-launch',
  templateUrl: './new-launch.component.html',
  styleUrls: ['./new-launch.component.css']
})
export class NewLaunchComponent implements OnInit {

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

  deleteLaunch(launch: Launch): void {

  }

  viewLaunch(launch: Launch): void {
    
  }
 
}
