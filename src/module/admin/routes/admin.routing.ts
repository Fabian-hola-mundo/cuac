import { Route } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const adminRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('../components/login/login.component').then((m) => m.LoginComponent),
    title: 'Login - Admin Cuac Design'
  },
  {
    path: '',
    loadComponent: () => import('../components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard - Admin Cuac Design',
    canActivate: [AuthGuard]
  },
  {
    path: 'proyectos',
    loadComponent: () => import('../components/proyectos/proyectos.component').then((m) => m.ProyectosComponent),
    title: 'Gestión de Proyectos - Admin Cuac Design',
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('../components/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
    title: 'Gestión de Usuarios - Admin Cuac Design',
    canActivate: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadComponent: () => import('../components/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent),
    title: 'Configuración - Admin Cuac Design',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
