import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import BtnAttribute from 'src/app/shared/helpers/btn-attribute';
import Validation from 'src/app/shared/helpers/validator';
import { UserRegister } from 'src/app/shared/interfaces/user/user-register.interface';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Output() registerNewUser: EventEmitter<UserRegister> = new EventEmitter();

  loading: boolean = false;
  
  userRegister: UserRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  registerForm: UntypedFormGroup = new UntypedFormGroup({});

  get userEmailRegister() {
    return this.userService.userRegister.email;
  }

  get formData() {
    return this.registerForm.controls;
  }

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userRegister.email = this.userEmailRegister;

    this.handleRegisterForm();
  }

  handleRegisterForm(): void {
    this.registerForm = new UntypedFormGroup({
      fullName: new UntypedFormControl(
        this.userRegister.fullName,
        [
          Validators.required,
          Validators.minLength(10),

        ]
      ),
      email: new UntypedFormControl(
        this.userRegister.email,
        [
          Validators.required,
          Validators.email,
        ]
      ),
      password: new UntypedFormControl(
        this.userRegister.password,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ),
      confirmPassword: new UntypedFormControl(
        this.userRegister.confirmPassword,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      )
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      BtnAttribute.disabled('btn-register', 'true');
      this.registerNewUser.emit(this.registerForm.value);
    }

    this.resetForm();
  }

  resetForm(): void {
    setTimeout(() => {
      this.registerForm.reset();
      this.loading = false;      
    }, 10000);
  }

  clearEmailSpace(): void {
    this.registerForm.setValue({
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email.trim(),
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    });
  }
}
