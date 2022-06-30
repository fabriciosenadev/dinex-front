import { Component, OnInit } from '@angular/core';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { CategoryRegister } from 'src/app/shared/interfaces/category/category-register.interface';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { categoryApplicableEnum } from 'src/app/shared/interfaces/category/enums/categoryApplicableEnum';
import { CategoryEventTypeEnum } from 'src/app/shared/interfaces/category/enums/categoryEventTypeEnum';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HeaderService } from 'src/app/shared/services/header/header.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isToShowIn: boolean = true;

  categoriesIn: Category[] = [];
  categoriesOut: Category[] = [];
  categoriesDeleted: Category[] = [];

  categoryApplicableEnum = categoryApplicableEnum;

  set headerOption(value: headerOptionsEnum) {
    this.headerService.headerOption = value;
  }

  constructor(
    private headerService: HeaderService,
    private notify: NotificationService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.headerOption = headerOptionsEnum.app;

    this.listCategories();
    this.listDeletedCategories();
  }

  listCategories() {
    this.categoryService.list().subscribe(
      (categories: Category[]) => {        
        this.categoriesIn = categories.filter(category => category.applicable.toLowerCase() === categoryApplicableEnum.in);
        this.categoriesOut = categories.filter(category => category.applicable.toLowerCase() === categoryApplicableEnum.out);        
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
    if(event.type === CategoryEventTypeEnum.delete) {
      this.onDelete(event.category);
    }
    else if(event.type === CategoryEventTypeEnum.reactive) {
      this.onReactive(event.category);
    }
  }

  showIn() {
    this.isToShowIn = true;

    let btnIn = document.querySelector('#in');
    let btnOut = document.querySelector('#out');

    let classIn = btnIn?.getAttribute('class');
    let classOut = btnOut?.getAttribute('class');

    if(!classIn?.includes('active'))
      btnIn?.setAttribute('class', classIn + ' active');

    if(classOut?.includes('active'))
      btnOut?.setAttribute('class', classOut.replace(' active', ''));
  }

  showOut() {
    this.isToShowIn = false;

    let btnIn = document.querySelector('#in');
    let btnOut = document.querySelector('#out');

    let classIn = btnIn?.getAttribute('class');
    let classOut = btnOut?.getAttribute('class');

    if(classIn?.includes('active'))
      btnIn?.setAttribute('class', classIn.replace(' active', ''));

    if(!classOut?.includes('active'))
      btnOut?.setAttribute('class', classOut + ' active');
  }

  onCreate(category: CategoryRegister): void {
   this.categoryService.create(category).subscribe(
      (category: Category) => {
        this.listCategories();
        this.listDeletedCategories();
        
        let title = 'Sucesso';
        let message = 'Categoria criada com sucesso!';
        this.notify.success(title, message);
      },
      (error) => {
        console.log(error);
      });
  }

  onDelete(category: Category) {
    this.categoryService.delete(category.id).subscribe(
      (response) => {
        this.listCategories();
        this.listDeletedCategories();

        let title = 'Sucesso';
        let message = 'Categoria excluída com sucesso!';
        this.notify.success(title, message);
      },
      (error) => {
        console.log(error);
        let errors = error.error;
        let errorTitle = "Erro ao deletar categoria";
        this.handleErrors(errorTitle, errors);
      }
    );
  }

  onReactive(category: Category) {   
    this.categoryService.reactive(category.id).subscribe(
      (response) => {
        this.listCategories();
        this.listDeletedCategories();

        let title = 'Sucesso';
        let message = 'Categoria reativada com sucesso!';
        this.notify.success(title, message);
      },
      (error) => {
        console.log(error);
        let errors = error.error;
        let errorTitle = "Erro ao realativar categoria";
        this.handleErrors(errorTitle, errors);
      }
    );
  }

  handleErrors(title: string, errors: any): void {    
    if (errors?.message) {
      this.notify.error(title, errors.message);
    }
  }
}
