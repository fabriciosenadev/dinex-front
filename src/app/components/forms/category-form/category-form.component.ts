import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/interfaces/category/category.interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Output() newCategory: EventEmitter<Category> = new EventEmitter();

  categoryForm: UntypedFormGroup = new UntypedFormGroup({});

  get formData() {
    return this.categoryForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleCategoryForm();
  }

  handleCategoryForm(): void {
    this.categoryForm = new UntypedFormGroup({
      name: new UntypedFormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      applicable: new UntypedFormControl(
        '',
        [
          Validators.required,
        ],
      ),
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.newCategory.emit(this.categoryForm.value);
      this.categoryForm.reset();
    }
  }

}
