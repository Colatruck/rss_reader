import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import{LoginComponent} from "./login/login.component";
import {loginGuard} from "./service/auth.guard";

export const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
    { path: 'list', component: HomeComponent ,canActivate: [loginGuard]},

];
