import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificar si el usuario está autenticado usando el servicio
    if (this.authService.isAuthenticated()) {
      // Verificar si el token no ha expirado
      if (!this.authService.isTokenExpired()) {
        return true;
      } else {
        // Token expirado, hacer logout y redirigir
        this.authService.logout();
        return this.router.createUrlTree(['/admin/login']);
      }
    } else {
      // No autenticado, redirigir al login
      return this.router.createUrlTree(['/admin/login']);
    }
  }
}
