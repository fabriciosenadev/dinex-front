import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { CategoryModalComponent } from 'src/app/components/modals/category-modal/category-modal.component';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { LaunchService } from 'src/app/shared/services/launch/launch.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { SessionService } from 'src/app/shared/services/session/session.service';

@Component({
  selector: 'app-edit-launch',
  templateUrl: './edit-launch.component.html',
  styleUrls: ['./edit-launch.component.css'],
})
export class EditLaunchComponent extends Notifications implements OnInit {
  loading = true;

  categories: Category[] = [];

  launchAndPayMethod: LaunchAndPayMethod = {
    launch: {
      id: 0,
      amount: 0,
      categoryId: 0,
      date: new Date(),
      description: '',
      status: LaunchStatus.pending,
    },
    payMethodFromLaunch: null,
  };

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    notify: NotificationService,
    session: SessionService,
    private headerService: HeaderService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private modalService: SimpleModalService,
    private categoryService: CategoryService,
    private launchService: LaunchService
  ) {
    super(notify, session);
  }

  ngOnInit(): void {
    this.session.validateSession();

    this.headerOption = HeaderOptionsEnum.app;

    this.loading = true;

    let selectedLaunchId = this.currentRoute.snapshot.paramMap.get('launchId');
    let launchId = selectedLaunchId ? parseInt(selectedLaunchId) : 0;

    this.getLaunch(launchId);
  }

  listCategories(): void {
    this.categoryService.list().subscribe({
      next: (categories: Category[]) => {
        let sortedCategories = categories.sort((a, b) =>
          a.name < b.name ? -1 : 1
        );
        this.categories = sortedCategories;
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      },
    });
  }

  openCategoryPage(isToOpenPage: boolean): void {
    if (isToOpenPage) {
      this.modalService
        .addModal(CategoryModalComponent, null)
        .subscribe((result) => {
          if (result.isToCreate) this.createCategory(result.categoryRegister);
        });
    }
  }

  createCategory(category: Category): void {
    this.categoryService.create(category).subscribe({
      next: (category: Category) => {
        this.listCategories();

        let message = 'Categoria criada com sucesso!';
        this.handleSuccess(message);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/app/user-settings']);
        this.handleError(error);
      },
      complete: () => {
        if (this.launchAndPayMethod.launch.id !== 0) this.loading = false;
      },
    });
  }

  getLaunch(launchId: number) {
    this.launchService.get(launchId).subscribe({
      next: (result) => {
        this.launchAndPayMethod = result;
        this.listCategories();
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  editLaunch(editLaunch: LaunchAndPayMethod): void {
    let date = editLaunch.launch.date.toString();
    let year = date.split('-')[0];
    let month = date.split('-')[1];
    
    this.launchService.update(editLaunch, false).subscribe({
      next: (result) => {
        let message = 'Lançamento criado!';
        this.handleSuccess(message);
      },
      error: (error) => {
        console.log(error);
        this.handleError(error);
      },
      complete: () => {
        this.router.navigate([`/app/launching/${year}/${month}`]);
      },
    });
  }
}
