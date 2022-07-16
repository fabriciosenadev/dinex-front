import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/shared/interfaces/category/category.interface';
import { LaunchPayMethod } from 'src/app/shared/interfaces/launch/enums/launchPayMethodEnum';
import { launchStatus } from 'src/app/shared/interfaces/launch/enums/launchStatusEnum';
import { LaunchAndPayMethodRegister } from 'src/app/shared/interfaces/launch/register/launch-and-pay-method-register.interface';
import { launchRegister } from 'src/app/shared/interfaces/launch/register/launch-register.interface';
import { PayMethodRegister } from 'src/app/shared/interfaces/launch/register/pay-method-register.interface';
import * as moment from 'moment';

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
    console.log(this.launchForm.value.launchType, typeof this.launchForm.value.launchType);
    
    
    this.showIsConfirmed = false;
    if(this.launchForm.value.launchType === 'in' || this.launchForm.value.launchType === 'out')
      this.showIsConfirmed = true;


    this.isConfirmedLabel = this.launchForm.value.launchType === 'in' ? 'recebido': 'pago';
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
