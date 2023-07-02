import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryApplicableEnum } from 'src/app/shared/interfaces/category/enums/categoryApplicableEnum';

export interface ResultCategoryRegister {
  categoryRegister: Category,
  isToCreate: boolean
}

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent extends SimpleModalComponent<null, ResultCategoryRegister> {

  title = 'Nova categoria';
  name: string = '';
  applicable: CategoryApplicableEnum = CategoryApplicableEnum.in;

  constructor() {
    super();
  }

  onCreate(newCategory: Category) {
    this.result = {
      categoryRegister: newCategory,
      isToCreate: true
    };
    this.close();
  }

  cancel() {
    this.result = {
      categoryRegister: {
        name: this.name,
        applicable: this.applicable
      },
      isToCreate: false
    };
    this.close();
  }



}
