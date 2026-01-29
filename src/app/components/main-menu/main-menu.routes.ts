import { Routes } from "@angular/router";
import { PathNames } from "../../shared/constants";

export const mainMenuRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-menu').then(m => m.MainMenu),
        children: [
            { path: '', redirectTo: PathNames.DASHBOARD, pathMatch: 'full' },
            { path: PathNames.DASHBOARD, loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
            { path: PathNames.FILES, loadComponent: () => import('./files/files').then(m => m.Files) },
        ]
    },
]