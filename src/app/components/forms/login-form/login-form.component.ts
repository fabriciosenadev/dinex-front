import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import BtnAttribute from 'src/app/shared/helpers/btn-attribute';
import { UserLogin } from 'src/app/shared/models/user/user-login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() loginUser: EventEmitter<UserLogin> = new EventEmitter();

  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({});

  get formData() {
    return this.loginForm.controls;
  }

  constructor() { }

  ngOnInit(): void {
    this.handleLoginForm();
  }

  handleLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ),
      password: new FormControl(
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
    setInterval(() => {
      this.loginForm.reset();
      this.loading = false;      
    }, 5000);
  }

}
