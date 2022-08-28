import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchPayMethod } from 'src/app/shared/interfaces/launch/enums/launchPayMethodEnum';
import { LaunchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import * as moment from 'moment';
import { LaunchAndPayMethod } from 'src/app/shared/interfaces/launch/launch-and-pay-method.interface';
import { Launch } from 'src/app/shared/interfaces/launch/launch.interface';
import { PayMethodFromLaunch } from 'src/app/shared/interfaces/launch/pay-method-from-launch.interface';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.css']
})
export class LaunchFormComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() newLaunch: EventEmitter<LaunchAndPayMethod> = new EventEmitter();
  @Output() openCategoryPage: EventEmitter<boolean> = new EventEmitter(false);

  // Icons
  faInfo = faInfo;

  launchForm: UntypedFormGroup = new UntypedFormGroup({});

  selectedCategories: Category[] = [];

  launchPayMethod = LaunchPayMethod;
  showPayMethods = false;

  showScheduling = false;

  isConfirmedLabel = '';
  showIsConfirmed = false;

  get formData() {
    return this.launchForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleLaunchForm();
  }

  handleLaunchForm(): void {
    this.launchForm = new UntypedFormGroup({
      launchType: new UntypedFormControl(
        '',
        [
          Validators.required,
        ],
      ),
      date: new UntypedFormControl(
        '',
        [
          Validators.required,
        ],
      ),
      categoryId: new UntypedFormControl(
        '',
        [
          Validators.required,
        ],
      ),
      description: new UntypedFormControl(
        '',
        [],
      ),
      amount: new UntypedFormControl(
        '',
        [
          Validators.required,
          Validators.min(0.01),
        ],
      ),
      payMethod: new UntypedFormControl(
        '',
        []
      ),
      isConfirmed: new UntypedFormControl(
        '',
        [],
      ),
      isScheduled: new UntypedFormControl(
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

    let newLaunchRegister: LaunchAndPayMethod = {
      launch: this.getLaunchRegister(),
      payMethodFromLaunch: this.launchForm.value.payMethod && launchTypeIsOut ? this.getPayMethod() : null,
    };

    this.newLaunch.emit(newLaunchRegister);
    this.launchForm.reset();
  }

  roleForm(): void {
    this.fillCategories();

    this.rolePayMethod();

    this.roleScheduling();

    this.roleIsConfirmed();
  }

  fillCategories(): void {
    this.selectedCategories = this.categories
      .filter(
        category =>
          category.applicable.toLowerCase() === this.launchForm.value.launchType
      );
  }

  rolePayMethod(): void {
    this.showPayMethods = this.launchForm.value.launchType === 'in' ? false : true;
  }

  roleScheduling(): void {
    const date = moment();
    let today = date.format('YYYY-MM-DD');
    
    let formSelectedDate = this.launchForm.value.date; 

    this.showScheduling = moment(formSelectedDate).isSameOrAfter(today);
  }

  roleIsConfirmed() : void {
    this.showIsConfirmed = false;

    if(this.launchForm.value.launchType === 'in' || this.launchForm.value.launchType === 'out')
      this.showIsConfirmed = true;

    this.isConfirmedLabel = this.launchForm.value.launchType === 'in' ? 'recebido': 'pago';
  }

  getLaunchRegister(): Launch {
    let newLaunchRegister: Launch = {
      date: this.launchForm.value.date,
      categoryId: this.launchForm.value.categoryId,
      description: this.launchForm.value.description,
      amount: this.launchForm.value.amount,
      status: this.getStatus(),
    };

    return newLaunchRegister;
  }

  getPayMethod(): PayMethodFromLaunch {
    let newPayMethodRegister: PayMethodFromLaunch = {
      payMethod: this.launchForm.value.payMethod,
    };

    return newPayMethodRegister;
  }

  getStatus(): LaunchStatus {

    if (this.launchForm.value.isConfirmed && this.launchForm.value.launchType === 'in') {
      return LaunchStatus.received;
    }

    if (this.launchForm.value.isConfirmed && this.launchForm.value.launchType === 'out') {
      return LaunchStatus.paid;
    }

    return LaunchStatus.pending;
  }
}
