import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [

  // { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'list', component: HomeComponent },
    { path: 'test', component: TestComponent },
  // { path: 'details/:index', loadComponent: () => import('./Dogs/dog-view.component').then(m => m.DogViewComponent) }

];
