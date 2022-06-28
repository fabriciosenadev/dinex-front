import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { categoryApplicableEnum } from 'src/app/shared/interfaces/category/enums/categoryApplicableEnum';
import { CategoryEventTypeEnum } from 'src/app/shared/interfaces/category/enums/categoryEventTypeEnum';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() isDeleted: boolean = false;
  @Output() categoryEvent: EventEmitter<any> = new EventEmitter();

  //Icons
  faTrashCan = faTrashCan;
  faArrowRotateLeft = faArrowRotateLeft;

  categoryApplicableEnum = categoryApplicableEnum;
  categoryEventTypeEnum = CategoryEventTypeEnum;

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(category: Category, type: CategoryEventTypeEnum) {
    let event = { category, type };
    this.categoryEvent.emit(event);
  }

}
