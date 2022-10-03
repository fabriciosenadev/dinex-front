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
import { SimpleModalModule } from 'ngx-simple-modal';
import { LaunchModalComponent } from './modals/launch-modal/launch-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';

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
    LaunchModalComponent, 
    ConfirmModalComponent, 
    PieChartComponent, 
    CategoryModalComponent, 
    BarChartComponent
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
    LaunchModalComponent,
    ConfirmModalComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    SimpleModalModule,
    NgChartsModule
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    LaunchModalComponent,
    ConfirmModalComponent
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    },
  ]
})
export class ComponentsModule { }
