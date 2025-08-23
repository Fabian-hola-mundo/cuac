import { Component, HostListener, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="layout__header">
      <nav class="layout__nav" [ngClass]="{ 'layout__nav--hidden': !isScrollingUp }">
        <div class="layout__nav-container">
          <div class="layout__nav-logo">
            <h2>Cuac Design</h2>
          </div>
          <ul class="layout__nav-menu">
            <li>
              <a routerLink="/" routerLinkActive="layout__nav-link--active" class="layout__nav-link">Inicio</a>
            </li>
            <li>
              <a routerLink="/servicios" routerLinkActive="layout__nav-link--active" class="layout__nav-link">Servicios</a>
            </li>
            <li>
              <a routerLink="/portafolio" routerLinkActive="layout__nav-link--active" class="layout__nav-link">Portafolio</a>
            </li>
            <li>
              <a routerLink="/sobre-nosotros" routerLinkActive="layout__nav-link--active" class="layout__nav-link">Sobre Nosotros</a>
            </li>
            <li>
              <a routerLink="/contacto" class="layout__nav-link layout__nav-link--cta">Contacto</a>
            </li>
          </ul>
          <button class="layout__nav-hamburger" [ngClass]="{ 'layout__nav-hamburger--active': isMobileMenuOpen }" (click)="toggleMobileMenu()" aria-label="Menú de navegación">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <!-- Menú móvil -->
        <div class="layout__nav-mobile" [ngClass]="{ 'layout__nav-mobile--open': isMobileMenuOpen }">
          <ul class="layout__nav-mobile-menu">
            <li><a routerLink="/" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Inicio</a></li>
            <li><a routerLink="/servicios" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Servicios</a></li>
            <li><a routerLink="/portafolio" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Portafolio</a></li>
            <li><a routerLink="/sobre-nosotros" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Sobre Nosotros</a></li>
            <li><a routerLink="/contacto" (click)="toggleMobileMenu()" class="layout__nav-mobile-link">Contacto</a></li>
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
            <p>info@cuacdesign.com</p>
            <p>+34 600 000 000</p>
          </div>
        </div>
        <div class="layout__footer-bottom">
          <p>&copy; 2024 Cuac Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  isScrollingUp = true;
  lastScrollPosition = 0;
  isMobileMenuOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
}
