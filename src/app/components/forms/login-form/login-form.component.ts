import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import BtnAttribute from 'src/app/shared/extensions/btn-attribute';
import { UserLogin } from 'src/app/shared/interfaces/user/user-login.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() loginUser: EventEmitter<UserLogin> = new EventEmitter();

  loading: boolean = false;

  loginForm: UntypedFormGroup = new UntypedFormGroup({});

  get formData() {
    return this.loginForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleLoginForm();
  }

  handleLoginForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ),
      password: new UntypedFormControl(
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      BtnAttribute.disabled('btn-login', 'true');
      this.loginUser.emit(this.loginForm.value);
    }

    this.resetForm();
  }

  resetForm(): void {
    setTimeout(() => {
      this.loginForm.reset();
      this.loading = false;      
    }, 3500);
  }

  clearEmailSpace(): void {
    this.loginForm.setValue({email: this.loginForm.value.email.trim(), password: this.loginForm.value.password });
  }

}
