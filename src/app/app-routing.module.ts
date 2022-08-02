import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    redirectTo: 'profile/0/notfound',
    pathMatch: 'full',
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile/:token', component: ProfilePageComponent },
  { path: '**', component: NotfoundComponent },
  { path: 'profile/0/notfound/', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
