# Componente de Login - CUAC Design Admin

## Descripción

Este componente proporciona una pantalla de login completa para el panel administrativo de CUAC Design, con las siguientes características:

- **Autenticación tradicional**: Login con email y contraseña
- **Autenticación sin contraseña**: Magic links enviados por email
- **Registro de usuarios**: Creación de cuentas para dominios corporativos autorizados
- **Validación de dominios**: Solo permite correos de dominios autorizados
- **Persistencia de sesión**: Opción de "recordar mi sesión"
- **Detección de Caps Lock**: Advertencia visual cuando está activado
- **Accesibilidad completa**: Soporte para lectores de pantalla y navegación por teclado
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla

## Características Técnicas

- **Angular 17**: Componente standalone con imports automáticos
- **Angular Material**: UI components siguiendo Material Design 3
- **Firebase Auth**: Autenticación y autorización
- **Reactive Forms**: Validación de formularios reactiva
- **SCSS con BEM**: Metodología de nomenclatura para CSS
- **TypeScript**: Tipado estático completo

## Configuración Requerida

### 1. Firebase Configuration

Asegúrate de tener configurado Firebase en tu proyecto:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key-aqui",
    authDomain: "cuac-design-3.firebaseapp.com",
    projectId: "cuac-design-3",
    storageBucket: "cuac-design-3.appspot.com",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id"
  }
};
```

### 2. Dominios Corporativos Autorizados

El componente está configurado para permitir solo correos de estos dominios:

```typescript
private readonly CORPORATE_DOMAINS = [
  '@opitech.com.co',
  '@agencianacionaldigital.com.co',
  '@colombiadigitales.com.co'
];
```

### 3. Rutas

El componente está disponible en la ruta `/admin/login`:

```typescript
// src/module/admin/routes/admin.routing.ts
{
  path: 'login',
  loadComponent: () => import('../components/login/login.component').then((m) => m.LoginComponent),
  title: 'Login - Admin Cuac Design'
}
```

## Uso

### Navegación Directa

```typescript
// Navegar al login
this.router.navigate(['/admin/login']);
```

### Protección de Rutas

```typescript
// Guard para proteger rutas administrativas
canActivate(): boolean {
  if (this.authService.isAuthenticated()) {
    return true;
  }
  this.router.navigate(['/admin/login']);
  return false;
}
```

## Funcionalidades

### Login Tradicional

1. Usuario ingresa email y contraseña
2. Se valida el formato del email
3. Se verifica la autenticación con Firebase
4. Se redirige según el rol del usuario

### Magic Links

1. Usuario solicita acceso sin contraseña
2. Se envía un enlace seguro por email
3. Usuario hace clic en el enlace
4. Se completa la autenticación automáticamente

### Registro de Usuarios

1. Usuario completa formulario de registro
2. Se valida que el email sea corporativo
3. Se envía magic link para confirmar cuenta
4. Se crea perfil básico del usuario

## Estados del Componente

- `isLoading`: Indica si hay una operación en curso
- `isRegisterMode`: Alterna entre login y registro
- `isPasswordlessMode`: Activa modo sin contraseña
- `magicLinkSent`: Confirma envío de magic link
- `loginError`: Mensajes de error para el usuario
- `successMessage`: Mensajes de éxito para el usuario

## Personalización

### Colores

Los colores se pueden personalizar modificando las variables CSS en `src/styles.scss`:

```scss
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #eaddff;
  // ... más variables
}
```

### Estilos

Los estilos del componente están en `login.component.scss` siguiendo la metodología BEM:

```scss
.login {
  &__container { /* ... */ }
  &__header { /* ... */ }
  &__form { /* ... */ }
  // ... más estilos
}
```

## Accesibilidad

- **ARIA labels**: Etiquetas descriptivas para lectores de pantalla
- **Navegación por teclado**: Soporte completo para navegación sin mouse
- **Contraste**: Colores que cumplen estándares de accesibilidad
- **Reduced motion**: Soporte para usuarios sensibles al movimiento

## Responsive Design

- **Desktop**: Layout centrado con ancho máximo de 480px
- **Tablet**: Adaptación automática del padding y espaciado
- **Mobile**: Layout full-screen sin bordes redondeados

## Dependencias

```json
{
  "@angular/material": "^17.0.0",
  "@angular/cdk": "^17.0.0",
  "@angular/animations": "^17.0.0",
  "@angular/fire": "^17.0.0"
}
```

## Troubleshooting

### Error de Firebase

Si ves errores de Firebase, verifica:
1. Configuración correcta en `environment.ts`
2. Instalación de `@angular/fire`
3. Configuración en `app.config.ts`

### Estilos no se aplican

Si los estilos de Material no se ven:
1. Verifica que `@angular/material` esté instalado
2. Asegúrate de que los estilos estén en `styles.scss`
3. Verifica que `provideAnimations()` esté en `app.config.ts`

### Magic links no funcionan

Para magic links:
1. Verifica configuración de Firebase Auth
2. Asegúrate de que el dominio esté autorizado
3. Verifica la configuración de `actionCodeSettings`

## Contribución

Para contribuir al componente:

1. Sigue la metodología BEM para CSS
2. Mantén la accesibilidad como prioridad
3. Usa las variables de color del sistema de diseño
4. Agrega tests para nuevas funcionalidades
5. Documenta cambios en este README

## Licencia

Este componente es parte del proyecto CUAC Design y está sujeto a la licencia del proyecto principal.
