import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
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
export class NewLaunchComponent extends Notifications implements OnInit {

  categories: Category[] = [];
  launches: Launch[] = [];

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private session: SessionService,
    private router: Router,
    private headerService: HeaderService,
    private categoryService: CategoryService,
    private launchService: LaunchService,
    public override notify: NotificationService,
  ) {
    super(notify)
  }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = HeaderOptionsEnum.app;

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
        this.handleError(error);
      });
  }

  createLaunch(newLaunch: LaunchAndPayMethodRegister): void {
    this.launchService.create(newLaunch).subscribe(
      (result: LaunchAndPayMethod) => {
        if (result.launch.id) {
          let message = 'Lançamento criado!';
          this.handleSuccess(message);

          this.listLastLaunches();
        }
      },
      (error) => {
        console.log(error);
        this.handleError(error);
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
        this.handleError(error);
      }
    );
  }

  deleteLaunch(launch: Launch): void {
    this.launchService.delete(launch.id).subscribe(
      (result) => {
        let message = 'Lançamento deleteado!';
        this.handleSuccess(message);

        this.listLastLaunches();
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

  updateStatusLaunch(launch: Launch): void {
    let launchAndPayMethod: LaunchAndPayMethod = {
      launch,
      payMethodFromLaunch: null
    }

    this.launchService.updateStatus(launchAndPayMethod, true).subscribe(
      (result) => {
        let message = 'Status atualizado!';
        this.handleSuccess(message);

        this.listLastLaunches();
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

}
