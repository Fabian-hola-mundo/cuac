# Cuac Design

Proyecto de diseño web moderno construido con Angular 17 y componentes Standalone.

## 🚀 Características

- **Angular 17** con componentes Standalone
- **SCSS** con metodología BEM
- **Material Design 3** sistema de colores
- **Arquitectura modular** con lazy loading
- **Responsive design** optimizado para móviles

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── app.routes.ts          # Rutas principales
│   ├── app.component.ts       # Componente raíz
│   └── app.config.ts         # Configuración de la aplicación
├── core/
│   ├── module/
│   │   ├── user/
│   │   │   ├── router/
│   │   │   │   └── lib.routes.ts    # Rutas del usuario
│   │   │   └── components/
│   │   │       ├── inicio/           # Página de inicio
│   │   │       ├── servicios/        # Página de servicios
│   │   │       ├── portafolio/       # Página de portafolio
│   │   │       ├── contacto/         # Página de contacto
│   │   │       └── sobre-nosotros/   # Página sobre nosotros
│   │   └── admin/
│   │       ├── routes/
│   │       │   └── admin.routing.ts  # Rutas del admin
│   │       └── components/
│   │           ├── dashboard/         # Panel de control
│   │           ├── proyectos/         # Gestión de proyectos
│   │           ├── usuarios/          # Gestión de usuarios
│   │           └── configuracion/    # Configuración del sistema
└── styles.scss               # Estilos globales y variables CSS
```

## 🎨 Sistema de Diseño

### Colores (Material Design 3)
- **Primary**: #6750a4 (Morado principal)
- **Secondary**: #625b71 (Gris azulado)
- **Tertiary**: #7d5260 (Rosa terracota)
- **Surface**: #fef7ff (Superficie clara)
- **Background**: #fef7ff (Fondo)

### Metodología BEM
- **Block**: `.inicio`, `.dashboard`
- **Element**: `__title`, `__content`, `__button`
- **Modifier**: `--primary`, `--secondary`

## 🛠️ Tecnologías

- **Frontend**: Angular 17
- **Estilos**: SCSS
- **Routing**: Angular Router con lazy loading
- **Componentes**: Standalone Components
- **Diseño**: Material Design 3

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd cuac-design
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm start
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 📱 Rutas Disponibles

### Usuario
- `/inicio` - Página principal
- `/servicios` - Servicios ofrecidos
- `/portafolio` - Trabajos realizados
- `/contacto` - Información de contacto
- `/sobre-nosotros` - Acerca de la empresa

### Admin
- `/admin` - Panel de control
- `/admin/proyectos` - Gestión de proyectos
- `/admin/usuarios` - Gestión de usuarios
- `/admin/configuracion` - Configuración del sistema

## 🎯 Próximos Pasos

- [ ] Implementar autenticación
- [ ] Agregar base de datos
- [ ] Crear API REST
- [ ] Implementar CMS
- [ ] Agregar tests unitarios
- [ ] Optimizar SEO

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Cuac Design** - Diseño creativo y soluciones digitales
