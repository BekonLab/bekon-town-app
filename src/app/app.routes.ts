import { Route } from '@angular/router';
import { proposalRoutes } from './proposals/proposal-routes';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },
  ...proposalRoutes,
];
