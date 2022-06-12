import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerifyComponent},
  {path: '',redirectTo:'/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
