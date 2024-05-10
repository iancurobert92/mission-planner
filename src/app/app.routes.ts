import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@shell/feature').then((c) => c.MainShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@home/feature').then((c) => c.HomeComponent),
      },
      {
        path: 'planner',
        loadComponent: () =>
          import('@planner/feature').then((c) => c.PlannerComponent),
      },
    ],
  },
];
