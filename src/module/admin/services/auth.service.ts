import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  User,
  signOut 
} from '@angular/fire/auth';
import { inject } from '@angular/core';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AdminUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private auth: Auth;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.auth = inject(Auth);
    
    // Verificar si hay un usuario autenticado al inicializar el servicio
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAuthState();
    }
  }

  /**
   * Inicializa el estado de autenticación escuchando cambios en Firebase Auth
   */
  private initializeAuthState(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        // Usuario autenticado en Firebase
        const user: AdminUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Administrador',
          role: 'admin'
        };

        // Guardar en localStorage para persistencia
        localStorage.setItem('admin_token', 'firebase-auth-' + firebaseUser.uid);
        localStorage.setItem('user_role', user.role);
        localStorage.setItem('user_data', JSON.stringify(user));

        this.currentUserSubject.next(user);
      } else {
        // Usuario no autenticado
        this.clearLocalStorage();
        this.currentUserSubject.next(null);
      }
    });
  }

  /**
   * Inicia sesión del usuario administrador
   */
  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Primero intentar con Firebase Auth
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            // Firebase Auth exitoso
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((firebaseError) => {
          console.log('Firebase Auth falló:', firebaseError);
          
          // Fallback a credenciales locales (solo para desarrollo)
          if (email === 'admin@cuacdesign.com' && password === 'admin123') {
            const user: AdminUser = {
              id: 'local-admin',
              email: email,
              name: 'Administrador Local',
              role: 'admin'
            };

            // Guardar en localStorage
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('admin_token', 'local-token-' + Date.now());
              localStorage.setItem('user_role', user.role);
              localStorage.setItem('user_data', JSON.stringify(user));
            }

            this.currentUserSubject.next(user);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    // Cerrar sesión en Firebase
    signOut(this.auth).then(() => {
      console.log('Sesión cerrada en Firebase');
    }).catch((error) => {
      console.error('Error cerrando sesión en Firebase:', error);
    });

    // Limpiar localStorage solo si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.clearLocalStorage();
    }

    // Limpiar el observable
    this.currentUserSubject.next(null);

    // Redirigir al login
    this.router.navigate(['/admin/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    // Verificar si hay un usuario autenticado en Firebase
    if (this.auth.currentUser) {
      return true;
    }

    // Fallback a verificación local (solo para desarrollo)
    const token = localStorage.getItem('admin_token');
    const userRole = localStorage.getItem('user_role');
    
    if (token && userRole === 'admin') {
      // Verificar que el usuario esté en el observable
      if (!this.currentUserSubject.value) {
        this.checkStoredAuth();
      }
      return !!this.currentUserSubject.value;
    }
    
    return false;
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): AdminUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica la autenticación almacenada
   */
  private checkStoredAuth(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  /**
   * Verifica si el token ha expirado (implementación básica)
   */
  isTokenExpired(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    // Si hay un usuario de Firebase activo, el token no ha expirado
    if (this.auth.currentUser) {
      return false;
    }

    // Verificar token local
    const token = localStorage.getItem('admin_token');
    if (!token) return true;

    // En un caso real, decodificarías el JWT y verificarías la expiración
    // Por ahora, simulamos que el token expira después de 24 horas
    if (token.startsWith('firebase-auth-')) {
      // Token de Firebase - no expira mientras el usuario esté activo
      return false;
    }

    const tokenTimestamp = parseInt(token.split('-').pop() || '0');
    const currentTime = Date.now();
    const tokenAge = currentTime - tokenTimestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    return tokenAge > maxAge;
  }

  /**
   * Limpia el localStorage
   */
  private clearLocalStorage(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  }
}
