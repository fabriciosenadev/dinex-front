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
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { CategoryTableComponent } from './tables/category-table/category-table.component';
import { LaunchTableComponent } from './tables/launch-table/launch-table.component';
import { MonthGridComponent } from './month/month-grid/month-grid.component';
import { MonthCardComponent } from './month/month-card/month-card.component';
import { TestModalComponent } from './test-modal/test-modal.component';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';

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
    LaunchFormComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    LaunchTableComponent,
    MonthGridComponent,
    MonthCardComponent,
    TestModalComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ActivationAccountFormComponent,
    SubMenuComponent,
    LaunchFormComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    LaunchTableComponent,
    MonthGridComponent,
    MonthCardComponent,
    TestModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    SimpleModalModule
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    TestModalComponent
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    },
  ]
})
export class ComponentsModule { }
