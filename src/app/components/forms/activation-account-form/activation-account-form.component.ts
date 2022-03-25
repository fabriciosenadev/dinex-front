import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import BtnAttribute from 'src/app/shared/helpers/btn-attribute';

@Component({
  selector: 'app-activation-account-form',
  templateUrl: './activation-account-form.component.html',
  styleUrls: ['./activation-account-form.component.css']
})
export class ActivationAccountFormComponent implements OnInit {
  @Output() activationCode: EventEmitter<string> = new EventEmitter();

  loading: boolean = false;

  activationForm: FormGroup = new FormGroup({});

  get formData() {
    return this.activationForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleActivationForm();
  }

  handleActivationForm(): void {
    this.activationForm = new FormGroup({
      activationCode: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ),
    });
  }

  onSubmit(): void {
    if (this.activationForm.valid) {
      this.loading = true;
      BtnAttribute.disabled('btn-activation', 'true');
      this.activationCode.emit(this.activationForm.value.activationCode);
    }

    this.activationForm.reset();
  }

}
