import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { isLoggedGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth/sign-in',
    component: SignInPageComponent,
    canActivate: [isLoggedGuard]
  },
  {
    path: 'auth/sign-up',
    component: SignUpPageComponent,
    canActivate: [isLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
