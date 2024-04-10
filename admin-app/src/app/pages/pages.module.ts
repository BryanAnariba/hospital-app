import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { GraphicsPageComponent } from './graphics-page/graphics-page.component';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RolePageComponent } from './role-page/role-page.component';

@NgModule({
  declarations: [
    NotFoundPageComponent,
    DashboardComponent,
    ProgressPageComponent,
    GraphicsPageComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    RolePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [
    AccountSettingsComponent,
  ],
})
export class PagesModule { }
