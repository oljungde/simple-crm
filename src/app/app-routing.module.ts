import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'customer', component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
