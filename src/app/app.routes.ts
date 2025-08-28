import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
          import('../module/user/routes/user.routes').then((m) => m.userRoutes),
        title: 'Cuac Design',
      },
      {
        path: 'admin',
        loadChildren: () => import('../module/admin/routes/admin.routing').then((m) => m.adminRoutes),
        data: { prerender: false }
      },
      { path: '**', pathMatch: 'full', redirectTo: '' },
];
