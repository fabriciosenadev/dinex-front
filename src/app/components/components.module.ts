import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ActivationAccountFormComponent } from './forms/activation-account-form/activation-account-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
