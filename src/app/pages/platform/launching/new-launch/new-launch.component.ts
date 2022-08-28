import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { CategoryModalComponent } from 'src/app/components/modals/category-modal/category-modal.component';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
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
    private modalService: SimpleModalService,
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

  openCategoryPage(isToOpenPage: boolean): void {
    if (isToOpenPage) {
      this.modalService.addModal(CategoryModalComponent, null)
        .subscribe(
          (result) => {
            if (result.isToCreate)
              this.createCategory(result.categoryRegister);
          }
        );
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

  createLaunch(newLaunch: LaunchAndPayMethod): void {
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
    if (launch?.id)
      this.launchService.delete(launch?.id).subscribe(
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

  createCategory(category: Category): void {
    this.categoryService.create(category).subscribe(
      (category: Category) => {
        this.listCategories();
        this.listLastLaunches();

        let message = 'Categoria criada com sucesso!';
        this.handleSuccess(message);
      },
      (error) => {
        console.log(error);
        this.handleError(error);
      });
  }

}
