import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { categoryApplicableEnum } from 'src/app/shared/helpers/Enums/categoryApplicableEnum';
import { headerOptionsEnum } from 'src/app/shared/helpers/Enums/headerOptionsEnum';
import { CategoryRegister } from 'src/app/shared/models/category/category-register.model';
import { Category } from 'src/app/shared/models/category/category.model';
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

  deleteCategoryForm: FormGroup = new FormGroup({});

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

  handleCategoryForm(): void {
    this.deleteCategoryForm = new FormGroup({
      id: new FormControl('', [])
    });
  }

  onCreate(category: CategoryRegister): void {
   this.categoryService.create(category).subscribe(
      (category: Category) => {
        this.listCategories();
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
        let title = 'Sucesso';
        let message = 'Categoria excluída com sucesso!';
        this.notify.success(title, message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
