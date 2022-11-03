import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  styleUrls: ['./launch-form.component.css'],
})
export class LaunchFormComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() launchToEdit: LaunchAndPayMethod | null = null;

  @Output() newLaunch: EventEmitter<LaunchAndPayMethod> = new EventEmitter();
  @Output() editLaunch: EventEmitter<LaunchAndPayMethod> = new EventEmitter();
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
  isConfirmedField = false;

  btnCreateUpdateLaunchLabel = '';

  formFields = {
    amount: 0,
    categoryId: 0,
    date: '',
    description: '',
    launchType: 'in',
    payMethod: LaunchPayMethod.cash,
    isConfirmed: false,
    isScheduled: false,
  };

  get formData() {
    return this.launchForm.controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.handleLaunchForm();
    this.btnCreateUpdateLaunchLabel = 'Criar lançamento';

    if (this.launchToEdit !== null) {
      this.fillForm();
      this.btnCreateUpdateLaunchLabel = 'Atualizar lançamento';
    }
  }

  //#region private methods
  private getDateForField(datetime: Date): string {
    var date = datetime.toString().split('T')[0];
    return date;
  }

  private getLaunchRegister(): Launch {
    let newLaunchRegister: Launch = {
      date: this.launchForm.value.date,
      categoryId: this.launchForm.value.categoryId,
      description: this.launchForm.value.description,
      amount: this.launchForm.value.amount,
      status: this.getStatus(),
    };

    return newLaunchRegister;
  }

  private getPayMethod(): PayMethodFromLaunch {
    let newPayMethodRegister: PayMethodFromLaunch = {
      payMethod: this.launchForm.value.payMethod,
    };

    return newPayMethodRegister;
  }

  private getStatus(): LaunchStatus {
    if (
      this.launchForm.value.isConfirmed &&
      this.launchForm.value.launchType === 'in'
    ) {
      return LaunchStatus.received;
    }

    if (
      this.launchForm.value.isConfirmed &&
      this.launchForm.value.launchType === 'out'
    ) {
      return LaunchStatus.paid;
    }

    return LaunchStatus.pending;
  }
  //#endregion

  handleLaunchForm(): void {
    this.launchForm = new UntypedFormGroup({
      launchType: new UntypedFormControl('', [Validators.required]),
      date: new UntypedFormControl('', [Validators.required]),
      categoryId: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', []),
      amount: new UntypedFormControl('', [
        Validators.required,
        Validators.min(0.01),
      ]),
      payMethod: new UntypedFormControl('', []),
      isConfirmed: new UntypedFormControl('', []),
      isScheduled: new UntypedFormControl('', []),
    });
  }

  goToCategoryPage(): void {
    this.openCategoryPage.emit(true);
  }

  onSubmit(): void {
    let launchTypeIsOut = this.launchForm.value.launchType === 'out';

    let launchAndPayMethod: LaunchAndPayMethod = {
      launch: this.getLaunchRegister(),
      payMethodFromLaunch:
        this.launchForm.value.payMethod && launchTypeIsOut
          ? this.getPayMethod()
          : null,
    };

    if (this.launchToEdit !== null) {
      launchAndPayMethod.launch.id = this.launchToEdit.launch.id;
      
      this.editLaunch.emit(launchAndPayMethod);
      return;
    }

    this.newLaunch.emit(launchAndPayMethod);
    this.launchForm.reset();
  }

  roleForm(): void {
    this.fillCategories();

    this.rolePayMethod();

    this.roleScheduling();

    this.roleIsConfirmed();
  }

  fillCategories(selectedType = this.launchForm.value.launchType): void {
    this.selectedCategories = this.categories.filter(
      (category) => category.applicable.toLowerCase() === selectedType
    );
  }

  rolePayMethod(): void {
    this.showPayMethods =
      this.launchForm.value.launchType === 'in' ? false : true;
  }

  roleScheduling(): void {
    const date = moment();
    let today = date.format('YYYY-MM-DD');

    let formSelectedDate = this.launchForm.value.date;

    this.showScheduling = moment(formSelectedDate).isSameOrAfter(today);
  }

  roleIsConfirmed(): void {
    this.showIsConfirmed = false;
    this.launchForm.value.isConfirmed = false;
    this.isConfirmedField = false;

    if (
      this.launchForm.value.launchType === 'in' ||
      this.launchForm.value.launchType === 'out'
    )
      this.showIsConfirmed = true;

    this.isConfirmedLabel =
      this.launchForm.value.launchType === 'in' ? 'recebido' : 'pago';

    var isConfirmedByPaymethod =
      this.launchForm.value.payMethod === this.launchPayMethod.cash ||
      this.launchForm.value.payMethod === this.launchPayMethod.debit;
    if (this.launchForm.value.launchType === 'out' && isConfirmedByPaymethod) {
      this.launchForm.value.isConfirmed = true;
      this.isConfirmedField = true;
    }
  }

  fillForm(): void {
    this.formFields.amount = this.launchToEdit?.launch.amount
      ? this.launchToEdit?.launch.amount
      : 0;
    this.formFields.categoryId = this.launchToEdit?.launch.categoryId
      ? this.launchToEdit?.launch.categoryId
      : 0;
    this.formFields.date = this.launchToEdit?.launch.date
      ? this.getDateForField(this.launchToEdit?.launch.date)
      : this.formFields.date;
    this.formFields.description = this.launchToEdit?.launch.description
      ? this.launchToEdit?.launch.description
      : '';

    this.formFields.isConfirmed = false;

    let isPaid =
      this.launchToEdit?.launch.status.toLowerCase() === LaunchStatus.paid;
    let isReceived =
      this.launchToEdit?.launch.status.toLowerCase() === LaunchStatus.received;

    if (isPaid || isReceived) this.formFields.isConfirmed = true;

    this.formFields.launchType = 'in';
    if (this.launchToEdit?.payMethodFromLaunch?.id !== 0) {
      this.formFields.launchType = 'out';
      switch (this.launchToEdit?.payMethodFromLaunch?.payMethod) {
        case 'Debit':
          this.formFields.payMethod = this.launchPayMethod.debit;
          break;
        case 'Credit':
          this.formFields.payMethod = this.launchPayMethod.credit;
          break;
        case 'Cash':
          this.formFields.payMethod = this.launchPayMethod.cash;
          break;
      }
    }

    this.fillCategories(this.formFields.launchType);

    this.launchForm.setValue(this.formFields);    

    this.roleForm();
  }
}
