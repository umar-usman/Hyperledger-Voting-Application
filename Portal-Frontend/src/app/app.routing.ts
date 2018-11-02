import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
