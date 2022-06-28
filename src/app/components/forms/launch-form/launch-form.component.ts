import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LaunchPayMethod } from 'src/app/shared/models/launch/enums/launchPayMethodEnum';
import { launchStatus } from 'src/app/shared/models/launch/enums/launchStatusEnum';
import { Category } from 'src/app/shared/models/category/category.model';
import { LaunchAndPayMethodRegister } from 'src/app/shared/models/launch/register/launch-and-pay-method-register.model';
import { launchRegister } from 'src/app/shared/models/launch/register/launch-register.model';
import { PayMethodRegister } from 'src/app/shared/models/launch/register/pay-method-register.model';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() newLaunch: EventEmitter<LaunchAndPayMethodRegister> = new EventEmitter();
  @Output() openCategoryPage: EventEmitter<boolean> = new EventEmitter(false);

  // Icons
  faInfo = faInfo;

  launchForm: FormGroup = new FormGroup({});

  selectedCategories: Category[] = [];

  launchPayMethod = LaunchPayMethod;
  showPayMethods = false;

  get formData() {
    return this.launchForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleLaunchForm();
  }

  handleLaunchForm(): void {
    this.launchForm = new FormGroup({
      launchType: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      date: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      categoryId: new FormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description: new FormControl(
        '',
        [],
      ),
      amount: new FormControl(
        '',
        [
          Validators.required,
          Validators.min(0.01),
        ],
      ),
      payMethod: new FormControl(
        '',
        []
      ),
      isConfirmed: new FormControl(
        '',
        [],
      ),
      isScheduled: new FormControl(
        '',
        [],
      ),
    });
  }

  goToCategoryPage(): void {
    this.openCategoryPage.emit(true);
  }

  onSubmit() {
    let launchTypeIsOut = this.launchForm.value.launchType === 'out';

    let newLaunchRegister: LaunchAndPayMethodRegister = {
      launch: this.getLaunchRegister(),
      payMethodFromLaunch: this.launchForm.value.payMethod && launchTypeIsOut ? this.getPayMethod() : null,
    };

    this.newLaunch.emit(newLaunchRegister);
    this.launchForm.reset();
  }

  roleForm(): void {
    this.fillCategories();

    this.showPayMethods = this.launchForm.value.launchType === 'in' ? false : true;
  }

  fillCategories(): void {
    this.selectedCategories = this.categories
      .filter(
        category =>
          category.applicable.toLowerCase() === this.launchForm.value.launchType
      );
  }

  getLaunchRegister(): launchRegister {
    let newLaunchRegister: launchRegister = {
      date: this.launchForm.value.date,
      categoryId: this.launchForm.value.categoryId,
      description: this.launchForm.value.description,
      amount: this.launchForm.value.amount,
      status: this.getStatus(),
    };

    return newLaunchRegister;
  }

  getPayMethod(): PayMethodRegister {
    let newPayMethodRegister: PayMethodRegister = {
      payMethod: this.launchForm.value.payMethod,
    };

    return newPayMethodRegister;
  }

  getStatus(): launchStatus {

    if (this.launchForm.value.isConfirmed && this.launchForm.value.launchType === 'in') {
      return launchStatus.received;
    }

    if (this.launchForm.value.isConfirmed && this.launchForm.value.launchType === 'out') {
      return launchStatus.paid;
    }

    return launchStatus.pending;
  }
}
