import { Route } from '@angular/router';

export const layutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../components/inicio/inicio.component').then((m) => m.InicioComponent),
    title: 'Inicio - Cuac Design'
  },
  {
    path: 'servicios',
    loadComponent: () => import('../components/servicios/servicios.component').then((m) => m.ServiciosComponent),
    title: 'Servicios - Cuac Design'
  },
  {
    path: 'portafolio',
    loadComponent: () => import('../components/portafolio/portafolio.component').then((m) => m.PortafolioComponent),
    title: 'Portafolio - Cuac Design'
  },
  {
    path: 'contacto',
    loadComponent: () => import('../components/contacto/contacto.component').then((m) => m.ContactoComponent),
    title: 'Contacto - Cuac Design'
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('../components/sobre-nosotros/sobre-nosotros.component').then((m) => m.SobreNosotrosComponent),
    title: 'Sobre Nosotros - Cuac Design'
  },

];
