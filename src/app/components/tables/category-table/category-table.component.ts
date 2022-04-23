import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { categoryApplicableEnum } from 'src/app/shared/helpers/Enums/categoryApplicableEnum';
import { Category } from 'src/app/shared/models/category/category.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(category: Category, type: string) {
    let event = { category, type };
    this.categoryEvent.emit(event);
  }

}
