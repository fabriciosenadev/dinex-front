import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/shared/extensions/notifications';
import { HeaderOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { CategoryRegister } from 'src/app/shared/interfaces/category/category-register.interface';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryApplicableEnum } from 'src/app/shared/interfaces/category/enums/categoryApplicableEnum';
import { CategoryEventTypeEnum } from 'src/app/shared/interfaces/category/enums/categoryEventTypeEnum';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends Notifications implements OnInit {

  isToShowIn: boolean = true;

  categoriesIn: Category[] = [];
  categoriesOut: Category[] = [];
  categoriesDeleted: Category[] = [];

  categoryApplicableEnum = CategoryApplicableEnum;

  set headerOption(value: HeaderOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private categoryService: CategoryService,
    public override notify: NotificationService,
  ) { 
    super(notify)
  }

  ngOnInit(): void {
    this.headerOption = HeaderOptionsEnum.app;

    this.listCategories();
    this.listDeletedCategories();
  }

  listCategories() {
    this.categoryService.list().subscribe(
      (categories: Category[]) => {
        this.categoriesIn = categories
          .filter(category => category.applicable.toLowerCase() === CategoryApplicableEnum.in);
        this.categoriesOut = categories
          .filter(category => category.applicable.toLowerCase() === CategoryApplicableEnum.out);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listDeletedCategories() {
    this.categoryService.listDeleted().subscribe(
      (categories: Category[]) => {
        this.categoriesDeleted = categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleEvent(event: any) {
    if (event.type === CategoryEventTypeEnum.delete) {
      this.onDelete(event.category);
    }
    else if (event.type === CategoryEventTypeEnum.reactive) {
      this.onReactive(event.category);
    }
  }

  showIn() {
    this.isToShowIn = true;

    let btnIn = document.querySelector('#in');
    let btnOut = document.querySelector('#out');

    let classIn = btnIn?.getAttribute('class');
    let classOut = btnOut?.getAttribute('class');

    if (!classIn?.includes('active'))
      btnIn?.setAttribute('class', classIn + ' active');

    if (classOut?.includes('active'))
      btnOut?.setAttribute('class', classOut.replace(' active', ''));
  }

  showOut() {
    this.isToShowIn = false;

    let btnIn = document.querySelector('#in');
    let btnOut = document.querySelector('#out');

    let classIn = btnIn?.getAttribute('class');
    let classOut = btnOut?.getAttribute('class');

    if (classIn?.includes('active'))
      btnIn?.setAttribute('class', classIn.replace(' active', ''));

    if (!classOut?.includes('active'))
      btnOut?.setAttribute('class', classOut + ' active');
  }

  onCreate(category: CategoryRegister): void {
    this.categoryService.create(category).subscribe(
      (category: Category) => {
        this.listCategories();
        this.listDeletedCategories();

        let message = 'Categoria criada com sucesso!';
        this.handleSuccess(message);
      },
      (error) => {
        console.log(error);
        this.handleError(error);
      });
  }

  onDelete(category: Category) {
    this.categoryService.delete(category.id).subscribe(
      (response) => {
        this.listCategories();
        this.listDeletedCategories();

        let message = 'Categoria excluída com sucesso!';
        this.handleSuccess(message);
      },
      (error) => {
        console.log(error);
        this.handleError(error);
      }
    );
  }

  onReactive(category: Category) {
    this.categoryService.reactivate(category.id).subscribe(
      (response) => {
        this.listCategories();
        this.listDeletedCategories();

        let message = 'Categoria reativada com sucesso!';
        this.handleSuccess(message);
      },
      (error) => {
        console.log(error);
        this.handleError(error);
      }
    );
  }
}
