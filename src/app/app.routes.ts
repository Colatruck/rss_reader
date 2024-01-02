import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import{LoginComponent} from "./login/login.component";
import {loginGuard} from "./service/auth.guard";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
    { path: 'list', component: HomeComponent ,canActivate: [loginGuard]},

];
