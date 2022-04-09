import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ActivationAccountFormComponent } from './forms/activation-account-form/activation-account-form.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent,
    SubMenuComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent,
    SubMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class ComponentsModule { }
