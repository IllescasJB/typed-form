import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'typed-form',
    loadComponent: () => import('./components/typed-form/typed-form.component')
      .then(m => m.TypedFormComponent)
  },
  {
    path: 'typed-form-optional',
    loadComponent: () => import('./components/typed-form-optional/typed-form-optional.component')
      .then(m => m.TypedFormOptionalComponent)
  },
  {
    path: '**',
    component: HomeComponent,
  }
]
