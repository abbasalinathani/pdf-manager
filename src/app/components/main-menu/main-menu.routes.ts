import { Routes } from "@angular/router";
import { PathNames } from "../../shared/constants";

export const mainMenuRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: PathNames.DASHBOARD },
    { path: PathNames.DASHBOARD, pathMatch: 'full', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
]