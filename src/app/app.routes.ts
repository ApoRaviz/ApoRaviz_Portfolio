import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'teach',
    loadComponent: () => import('./pages/teach-page/teach-page.component').then((m) => m.TeachPageComponent),
  },
  {
    path: 'commands',
    loadComponent: () => import('./pages/commands-page/commands-page.component').then((m) => m.CommandsPageComponent),
  },
  { path: '**', redirectTo: '' },
];
