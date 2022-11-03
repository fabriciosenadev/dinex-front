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
    session: SessionService,
    private router: Router,
    private headerService: HeaderService,
    private categoryService: CategoryService,
    private launchService: LaunchService,
    private modalService: SimpleModalService,
    notify: NotificationService,
  ) {
    super(notify, session)
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
    this.categoryService.list().subscribe({
      next: (categories: Category[]) => {
        let sortedCategories = categories.sort((a, b) => (a.name < b.name) ? -1 : 1)
        this.categories = sortedCategories;
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      }
    });
  }

  createLaunch(newLaunch: LaunchAndPayMethod): void {
    this.launchService.create(newLaunch).subscribe({
      next: (result: LaunchAndPayMethod) => {
        if (result.launch.id) {
          let message = 'Lançamento criado!';
          this.handleSuccess(message);

          this.listLastLaunches();
        }
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      }
    });
  }

  listLastLaunches(): void {
    this.launchService.listLastLaunches().subscribe({
      next: (launches: Launch[]) => {
        this.launches = launches;
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      }
    });
  }

  deleteLaunch(launch: Launch): void {
    if (launch?.id)
      this.launchService.delete(launch?.id).subscribe({
        next: (result) => {
          let message = 'Lançamento deleteado!';
          this.handleSuccess(message);

          this.listLastLaunches();
        },
        error: (error) => {
          console.error(error);
          this.handleError(error);
        }
      });
  }

  updateLaunchStatus(launch: Launch): void {
    let launchAndPayMethod: LaunchAndPayMethod = {
      launch,
      payMethodFromLaunch: null
    }

    this.launchService.update(launchAndPayMethod, true).subscribe({
      next: (result) => {
        let message = 'Status atualizado!';
        this.handleSuccess(message);

        this.listLastLaunches();
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      }
    });
  }

  createCategory(category: Category): void {
    this.categoryService.create(category).subscribe({
      next: (category: Category) => {
        this.listCategories();
        this.listLastLaunches();

        let message = 'Categoria criada com sucesso!';
        this.handleSuccess(message);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/app/user-settings']);
        this.handleError(error);
      }
    });
  }

  openEditing(launch: Launch) {
    this.router.navigate([`/app/launching/edit/${launch.id}`]);
  }

}
