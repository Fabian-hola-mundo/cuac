import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

export interface FirestoreUser {
  id: string;
  role: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {
  // Estados de UI
  hide = true;
  isLoading = false;
  capsLockOn = false;
  isSecureConnection = false;
  
  // Nuevos estados para autenticación sin contraseña
  isRegisterMode = false;
  isPasswordlessMode = false;
  magicLinkSent = false;
  
  // Mensajes
  loginError: string | null = null;
  successMessage: string | null = null;
  
  // Identificadores únicos para accesibilidad
  errorId = Math.random().toString(36).substring(2, 15);
  
  // Formularios
  loginForm: FormGroup;
  registerForm: FormGroup;
  
  // Suscripciones
  private userSubscription?: Subscription;
  private loginAttempts = 0;
  private maxLoginAttempts = 5;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    // Registrar iconos personalizados
    this.registerIcons();
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      rememberMe: [false]
    });
  }

  // Registrar iconos personalizados
  private registerIcons(): void {
    // Iconos básicos de Material Design (ya están incluidos por defecto)
    // Si quieres usar iconos personalizados, puedes registrarlos aquí:
    
    // Ejemplo de cómo registrar un icono personalizado:
    // this.iconRegistry.addSvgIcon(
    //   'custom-icon',
    //   this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/custom-icon.svg')
    // );
  }

  ngOnInit(): void {
    // Verificar si la conexión es segura
    this.checkSecureConnection();
    
    // Verificar si es un magic link
    this.checkForMagicLink();
    
    // Verificar estado anterior de "recordarme"
    this.checkRememberMeState();

    // Limpiar mensajes de error al cambiar los valores del formulario
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = null;
      }
    });

    this.registerForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = null;
      }
    });
  }

  // Alternar entre modo login y registro
  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.loginError = null;
    this.successMessage = null;
    this.magicLinkSent = false;
    
    // Limpiar formularios
    this.loginForm.reset({ rememberMe: false });
    this.registerForm.reset({ rememberMe: false });
  }

  // Alternar modo de autenticación sin contraseña
  togglePasswordlessMode(): void {
    this.isPasswordlessMode = !this.isPasswordlessMode;
    this.loginError = null;
    this.successMessage = null;
  }

  // Verificar si es un magic link de retorno
  private async checkForMagicLink(): Promise<void> {
    if (isPlatformBrowser(this.platformId) && isSignInWithEmailLink(this.auth, window.location.href)) {
      try {
        this.isLoading = true;
        this.successMessage = 'Completando autenticación...';

        // Obtener email del localStorage (guardado antes de enviar el link)
        let email = isPlatformBrowser(this.platformId) ? localStorage.getItem('emailForSignIn') : null;
        
        if (!email) {
          // Si no hay email guardado, pedirlo al usuario
          email = isPlatformBrowser(this.platformId) ? window.prompt('Por favor, confirma tu correo electrónico:') || '' : '';
        }

        if (email) {
          // Completar el login con magic link
          const result = await signInWithEmailLink(this.auth, email, window.location.href);
          
          if (result.user) {
            // Limpiar email guardado
            localStorage.removeItem('emailForSignIn');
            
            // Procesar login exitoso
            await this.processSuccessfulAuth(result.user.uid, email);
          }
        } else {
          throw new Error('Correo electrónico no válido');
        }
      } catch (error: any) {
        console.error('Error con magic link:', error);
        this.handleLoginError(error);
        
        // Limpiar URL del magic link
        this.router.navigate(['/admin/login'], { replaceUrl: true });
      } finally {
        this.isLoading = false;
      }
    }
  }

  // Procesar autenticación exitosa
  private async processSuccessfulAuth(uid: string, email: string): Promise<void> {
    try {
      this.successMessage = '¡Bienvenido! Redirigiendo al panel administrativo...';

      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 1500);
    } catch (error) {
      console.error('Error procesando autenticación:', error);
      this.handleLoginError(error);
    }
  }

  // Enviar magic link para login sin contraseña
  async sendMagicLink(): Promise<void> {
    const emailControl = this.isRegisterMode ? 
      this.registerForm.get('email') : 
      this.loginForm.get('email');

    if (!emailControl?.valid) {
      this.loginError = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    const email = emailControl.value.toLowerCase();
    
    try {
      this.isLoading = true;
      this.loginError = null;

      // Configuración del magic link
      const actionCodeSettings = {
        url: `${window.location.origin}/admin/login`,
        handleCodeInApp: true,
      };

      // Enviar el magic link
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);

      // Guardar email para cuando regrese
      localStorage.setItem('emailForSignIn', email);

      // Mostrar mensaje de éxito
      this.magicLinkSent = true;
      this.successMessage = `✨ Magic link enviado a ${email}. Revisa tu bandeja de entrada y haz clic en el enlace para acceder.`;

    } catch (error: any) {
      console.error('Error enviando magic link:', error);
      this.handleMagicLinkError(error);
    } finally {
      this.isLoading = false;
    }
  }

  // Registro con magic link
  async registerWithMagicLink(): Promise<void> {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      this.loginError = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const formData = this.registerForm.value;
    
    try {
      this.isLoading = true;
      this.loginError = null;

      // Guardar datos adicionales del registro temporalmente
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase(),
        rememberMe: formData.rememberMe
      };
      
      localStorage.setItem('registrationData', JSON.stringify(registrationData));

      // Enviar magic link
      await this.sendMagicLink();

    } catch (error: any) {
      console.error('Error en registro:', error);
      this.handleLoginError(error);
    } finally {
      this.isLoading = false;
    }
  }

  // Manejo específico de errores de magic link
  private handleMagicLinkError(error: any): void {
    const magicLinkErrors: { [key: string]: string } = {
      'auth/invalid-email': 'El formato del correo electrónico no es válido.',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada. Contacta al administrador.',
      'auth/too-many-requests': 'Demasiadas solicitudes. Espera unos minutos antes de intentar nuevamente.',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet e intenta nuevamente.',
      'auth/unauthorized-domain': 'Dominio no autorizado para magic links. Contacta al administrador.',
      'auth/invalid-action-code': 'El enlace de acceso es inválido o ha expirado. Solicita uno nuevo.',
      'auth/expired-action-code': 'El enlace de acceso ha expirado. Solicita uno nuevo.',
    };

    this.loginError = magicLinkErrors[error.code] || 
      'Error al enviar el enlace de acceso. Intenta nuevamente o contacta al soporte.';
  }

  // Verificar estado anterior de "recordarme"
  private checkRememberMeState(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const lastLoginEmail = localStorage.getItem('lastLoginEmail') || '';
    
    if (rememberMe) {
      this.loginForm.patchValue({ 
        rememberMe: true,
        email: lastLoginEmail
      });
    }
  }

  // Detectar estado de Caps Lock
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  onKeyboardEvent(event: KeyboardEvent): void {
    this.capsLockOn = event.getModifierState('CapsLock');
  }

  // Métodos de accesibilidad
  getEmailErrorId(): string {
    const form = this.isRegisterMode ? this.registerForm : this.loginForm;
    const emailControl = form.get('email');
    if (emailControl?.hasError('required') && emailControl?.touched) {
      return `email-error-required-${this.errorId}`;
    }
    if (emailControl?.hasError('email') && emailControl?.touched) {
      return `email-error-format-${this.errorId}`;
    }
    return '';
  }

  getPasswordErrorId(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required') && passwordControl?.touched) {
      return `password-error-required-${this.errorId}`;
    }
    if (passwordControl?.hasError('minlength') && passwordControl?.touched) {
      return `password-error-length-${this.errorId}`;
    }
    return '';
  }

  // Alternar visibilidad de contraseña
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  // Método principal de login
  async onLogin(): Promise<void> {
    if (this.loginForm.valid && this.loginAttempts < this.maxLoginAttempts) {
      this.isLoading = true;
      this.loginError = null;
      this.loginAttempts++;

      const { email, password, rememberMe } = this.loginForm.value;

      try {
        // Usar el AuthService que ahora maneja Firebase correctamente
        const authSuccess = await this.authService.login(email, password);
        
        if (authSuccess) {
          // Mostrar mensaje de éxito
          this.successMessage = 'Iniciando sesión...';
          
          // Configurar persistencia de preferencia en localStorage
          this.saveRememberMePreference(rememberMe);

          // Redirigir al panel administrativo
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1500);
        } else {
          // Si falla la autenticación
          throw new Error('Credenciales inválidas');
        }
      } catch (error: any) {
        this.handleLoginError(error);
      } finally {
        this.isLoading = false;
      }
    } else if (this.loginAttempts >= this.maxLoginAttempts) {
      this.loginError = 'Demasiados intentos fallidos. Por favor, recupera tu contraseña o contacta al soporte.';
    } else {
      this.markFormGroupTouched(this.loginForm);
      this.loginError = 'Por favor, revisa los campos del formulario y corrige los errores.';
    }
  }

  // Configurar persistencia de Firebase Auth
  private async configurePersistence(rememberMe: boolean): Promise<void> {
    try {
      if (rememberMe) {
        // Persistencia local: la sesión permanece incluso después de cerrar el navegador
        await setPersistence(this.auth, browserLocalPersistence);
        console.log('Persistencia configurada: LOCAL (recordar sesión)');
      } else {
        // Persistencia de sesión: la sesión dura solo mientras la pestaña esté abierta
        await setPersistence(this.auth, browserSessionPersistence);
        console.log('Persistencia configurada: SESSION (no recordar sesión)');
      }
    } catch (error) {
      console.error('Error configurando persistencia:', error);
      // Continuar con el login aunque falle la configuración de persistencia
    }
  }

  // Guardar preferencia de "recordarme" en localStorage
  private saveRememberMePreference(rememberMe: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('lastLoginEmail', this.loginForm.get('email')?.value || '');
      console.log('Preferencias guardadas: usuario será recordado');
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('lastLoginEmail');
      console.log('Preferencias limpiadas: usuario no será recordado');
    }
  }

  // Limpiar preferencias de "recordarme" (útil para logout)
  public clearRememberMePreferences(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('lastLoginEmail');
    console.log('Preferencias de "recordarme" limpiadas');
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markFormGroupTouched(formGroup: FormGroup = this.loginForm): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Manejo mejorado de errores
  private handleLoginError(error: any): void {
    console.error('Error en el inicio de sesión:', error);
    
    // Mapeo de errores más específico
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No existe una cuenta con este correo electrónico. Verifica tu correo o regístrate.',
      'auth/wrong-password': 'La contraseña es incorrecta. Verifica tu contraseña o usa "¿Olvidaste tu contraseña?"',
      'auth/invalid-email': 'El formato del correo electrónico no es válido.',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada. Contacta al administrador.',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Tu cuenta ha sido bloqueada temporalmente. Intenta más tarde o recupera tu contraseña.',
      'auth/network-request-failed': 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.',
      'auth/user-data-error': 'Error al obtener los datos de tu perfil. Contacta al soporte técnico.',
      'auth/operation-not-allowed': 'El método de autenticación no está habilitado. Contacta al administrador.',
      'auth/weak-password': 'La contraseña es muy débil. Debe tener al menos 6 caracteres.',
      'auth/email-already-in-use': 'Ya existe una cuenta con este correo electrónico.',
      'auth/invalid-credential': 'Las credenciales proporcionadas no son válidas. Verifica tu correo y contraseña.',
      'auth/account-exists-with-different-credential': 'Ya existe una cuenta con el mismo correo pero diferente método de acceso.',
      'auth/credential-already-in-use': 'Esta credencial ya está asociada a otra cuenta.',
      'auth/timeout': 'La operación ha expirado. Intenta nuevamente.',
      'auth/popup-closed-by-user': 'Ventana de autenticación cerrada. Intenta nuevamente.',
      'auth/popup-blocked': 'El navegador bloqueó la ventana emergente. Permite ventanas emergentes y vuelve a intentar.',
      'auth/unauthorized-domain': 'Dominio no autorizado. Contacta al administrador.'
    };

    this.loginError = errorMessages[error.code] || 'Error inesperado al iniciar sesión. Intenta nuevamente o contacta al soporte.';
    
    // Focus en el primer campo con error para accesibilidad
    setTimeout(() => {
      const firstErrorField = document.querySelector('.login__field--error input') as HTMLInputElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }, 100);
  }

  // Verificar si la conexión es realmente segura
  private checkSecureConnection(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isSecureConnection = window.location.protocol === 'https:';
    } else {
      this.isSecureConnection = false;
    }
  }

  // Limpieza de recursos
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
