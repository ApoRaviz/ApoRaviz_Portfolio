import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { TeachPageComponent } from './pages/teach-page/teach-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'teach', component: TeachPageComponent },
  { path: '**', redirectTo: '' },
];
