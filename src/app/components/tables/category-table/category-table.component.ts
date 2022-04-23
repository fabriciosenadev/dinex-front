import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/shared/models/category/category.model';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

    //Icons
    faTrash = faTrashCan;

  @Input() categories: Category[] = [];
  @Output() onDeleteCategory: EventEmitter<Category> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(category: Category) {
    this.onDeleteCategory.emit(category);
  }

}
