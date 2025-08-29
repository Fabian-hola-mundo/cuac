import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="layout__header">
      <nav class="layout__nav" [ngClass]="{ 'layout__nav--hidden': !isScrollingUp }">
        <div class="layout__nav-container">
          <div class="layout__nav-content">
            <!-- Logo -->
            <div class="layout__nav-logo" (click)="onLogoClick()">
              <img 
                src="assets/img/logo-ACTUALIZADO-01-1.svg" 
                alt="CUAC Design Logo" 
                class="layout__nav-logo-img"
              />
            </div>
            
            <!-- Menu principal -->
            <div class="layout__nav-menu-section">
              <div class="layout__nav-links">
                <a routerLink="/servicios" routerLinkActive="layout__nav-link--active" class="layout__nav-link">SERVICIOS</a>
                <div class="layout__nav-divider"></div>
                <a routerLink="/portafolio" routerLinkActive="layout__nav-link--active" class="layout__nav-link">PORTAFOLIO</a>
              </div>
              
              <!-- Botón CTA -->
              <div class="layout__nav-cta">
                <button class="layout__nav-btn-estanque" (click)="onEntrarEstanque()">
                  ENTRAR AL ESTANQUE
                </button>
              </div>
            </div>
            
            <!-- Hamburger para móvil -->
            <button class="layout__nav-hamburger" [ngClass]="{ 'layout__nav-hamburger--active': isMobileMenuOpen }" (click)="toggleMobileMenu()" aria-label="Menú de navegación">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        <!-- Menú móvil -->
        <div class="layout__nav-mobile" [ngClass]="{ 'layout__nav-mobile--open': isMobileMenuOpen }">
          <ul class="layout__nav-mobile-menu">
            <li><a routerLink="/" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Inicio</a></li>
            <li><a routerLink="/servicios" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Servicios</a></li>
            <li><a routerLink="/portafolio" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Portafolio</a></li>
            <li><a routerLink="/admin" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Admin</a></li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="layout__content">
      <router-outlet></router-outlet>
    </main>

    <footer class="layout__footer">
      <div class="layout__footer-container">
        <div class="layout__footer-content">
          <div class="layout__footer-section">
            <h3>Cuac Design</h3>
            <p>Diseño creativo y soluciones digitales para tu negocio</p>
          </div>
          <div class="layout__footer-section">
            <h4>Servicios</h4>
            <ul>
              <li><a routerLink="/servicios">Diseño Web</a></li>
              <li><a routerLink="/servicios">Branding</a></li>
              <li><a routerLink="/servicios">UX/UI Design</a></li>
            </ul>
          </div>
          <div class="layout__footer-section">
            <h4>Contacto</h4>
            <p>infocuacdesign.com</p>
            <p>+34 600 000 000</p>
          </div>
        </div>
        <div class="layout__footer-bottom">
          <p>&copy; 2024 Cuac Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isScrollingUp = true;
  lastScrollPosition = 0;
  isMobileMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentScrollPosition = window.pageYOffset;
      this.isScrollingUp = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onEntrarEstanque() {
    // Redirigir al área de administración
    this.router.navigate(['/admin']);
    // Cerrar menú móvil si está abierto
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  onLogoClick() {
    // Redirigir al inicio cuando se hace clic en el logo
    this.router.navigate(['/']);
    // Cerrar menú móvil si está abierto
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
}
