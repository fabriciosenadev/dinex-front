import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryRegister } from 'src/app/shared/interfaces/category/category-register.interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Output() newCategory: EventEmitter<CategoryRegister> = new EventEmitter();

  categoryForm: FormGroup = new FormGroup({});

  get formData() {
    return this.categoryForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleCategoryForm();
  }

  handleCategoryForm(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ),
      applicable: new FormControl(
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
