import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ActivationAccountFormComponent } from './forms/activation-account-form/activation-account-form.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { LaunchFormComponent } from './forms/launch-form/launch-form.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent,
    SubMenuComponent,
    LaunchFormComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent,
    SubMenuComponent,
    LaunchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CurrencyMaskModule
  ],
  providers: [
    { 
      provide: CURRENCY_MASK_CONFIG, 
      useValue: CustomCurrencyMaskConfig 
    },
  ]
})
export class ComponentsModule { }
