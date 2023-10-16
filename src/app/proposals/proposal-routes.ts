import type { Route } from '@angular/router';

export const proposalRoutes: Route[] = [
  {
    path: 'proposals',
    loadComponent: () =>
      import('./proposals-shell.component').then(
        (m) => m.ProposalsShellComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./proposals-list-page.component').then(
            (m) => m.ProposalsListPageComponent
          ),
      },
    ],
  },
  {
    path: 'proposals/view/:proposalId',
    loadComponent: () =>
      import('./proposal-view-shell.component').then(
        (m) => m.ProposalViewShellComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./proposal-view-page.component').then(
            (m) => m.ProposalViewPageComponent
          ),
      },
    ],
  },
  {
    path: 'proposals/settings',
    loadComponent: () =>
      import('./proposal-settings-shell.component').then(
        (m) => m.ProposalSettingsShellComponent
      ),
    children: [
      {
        path: 'general',
        loadComponent: () =>
          import('./proposal-settings-general-page.component').then(
            (m) => m.ProposalSettingsGeneralPageComponent
          ),
      },
      {
        path: 'advanced',
        loadComponent: () =>
          import('./proposal-settings-advanced-page.component').then(
            (m) => m.ProposalSettingsAdvancedPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'general',
      },
    ],
  },
];
