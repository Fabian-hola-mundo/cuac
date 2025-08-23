import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard - Admin Cuac Design'
  },
  {
    path: 'proyectos',
    loadComponent: () => import('../components/proyectos/proyectos.component').then((m) => m.ProyectosComponent),
    title: 'Gestión de Proyectos - Admin Cuac Design'
  },
  {
    path: 'usuarios',
    loadComponent: () => import('../components/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
    title: 'Gestión de Usuarios - Admin Cuac Design'
  },
  {
    path: 'configuracion',
    loadComponent: () => import('../components/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent),
    title: 'Configuración - Admin Cuac Design'
  }
];
