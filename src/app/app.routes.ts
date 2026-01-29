import { Routes } from '@angular/router';
import { PathNames } from './shared/constants';
import { AuthService } from './services/auth/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    { path: PathNames.REGISTER, pathMatch: 'full', loadComponent: () => import('./components/register/register').then(m => m.Register) },
    { path: PathNames.LOGIN, pathMatch: 'full', loadComponent: () => import('./components/login/login').then(m => m.Login) },
    { path: PathNames.MAIN, pathMatch: 'full', loadChildren: () => import('./components/main-menu/main-menu.routes').then(m => m.mainMenuRoutes) },
    { path: '', pathMatch: 'full', redirectTo: () => inject(AuthService).isAuthenticated ? PathNames.MAIN : PathNames.REGISTER },
];
