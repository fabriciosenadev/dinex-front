import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import BtnAttribute from 'src/app/shared/extensions/btn-attribute';

@Component({
  selector: 'app-activation-account-form',
  templateUrl: './activation-account-form.component.html',
  styleUrls: ['./activation-account-form.component.css']
})
export class ActivationAccountFormComponent implements OnInit {
  @Output() registeredEmail: EventEmitter<string> = new EventEmitter();

  loading: boolean = false;

  activationForm: UntypedFormGroup = new UntypedFormGroup({});

  get formData() {
    return this.activationForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleActivationForm();
  }

  handleActivationForm(): void {
    this.activationForm = new UntypedFormGroup({
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ),
    });
  }

  onSubmit(): void {
    if (this.activationForm.valid) {
      this.loading = true;
      BtnAttribute.disabled('btn-activation', 'true');
      this.registeredEmail.emit(this.activationForm.value.email);
    }

    setTimeout(() => {
      this.activationForm.reset();
    }, 5000);
  }

  clearEmailSpace(): void {
    this.activationForm.setValue({email: this.activationForm.value.email.trim() });
  }
}
