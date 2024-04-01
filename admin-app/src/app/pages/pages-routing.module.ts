import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { GraphicsPageComponent } from './graphics-page/graphics-page.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { 
          title: 'Dashboard', 
        },
      },
      {
        path: 'progress',
        component: ProgressPageComponent,
        data: {
          title: 'Progress',
        }
      },
      {
        path: 'graphics',
        component: GraphicsPageComponent,
        data: {
          title: 'Graphics',
        },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings',
        },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: {
          title: 'Promises',
        },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          title: 'Observables',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
