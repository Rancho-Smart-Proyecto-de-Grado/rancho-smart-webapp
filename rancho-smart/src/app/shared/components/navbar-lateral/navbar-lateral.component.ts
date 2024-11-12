import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-lateral',
  standalone: true,
  imports: [
    MatIconModule, 
    NgClass, 
    RouterLink],
  templateUrl: './navbar-lateral.component.html',
  styleUrl: './navbar-lateral.component.css'
})
export class NavbarLateralComponent {
  isSidebarHidden = false;
  activeRoute: string = '';

  menuState: Record<string, boolean> = {
    salud: false,
    produccion: false,
    genealogia: false,
    ventas: false,
    inventario: false,
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.activeRoute = this.router.url;
      this.updateMenuState();
    });
  }

  toggleMenu(menu: string): void {
    this.menuState[menu] = !this.menuState[menu];
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  closeSidebar(): void {
    this.isSidebarHidden = true;
    setTimeout(() => {
      this.isSidebarHidden = false;
    }, 400);
  }

  private updateMenuState(): void {
    // Abre automáticamente el submenú si la ruta coincide con una subopción.
    if (this.activeRoute.includes('/historial-medico') ||
      this.activeRoute.includes('/registro-vacunacion') ||
      this.activeRoute.includes('/reportes-salud')) {
      this.menuState['salud'] = true;
    }
    if (this.activeRoute.includes('/registro-produccion') ||
      this.activeRoute.includes('/reportes-produccion')) {
      this.menuState['produccion'] = true;
    }
    if (this.activeRoute.includes('/registro-genealogia') ||
      this.activeRoute.includes('/registro-apareamientos') ||
      this.activeRoute.includes('/optimizacion-apareamientos')) {
      this.menuState['genealogia'] = true;
    }
    if (this.activeRoute.includes('/registro-ventas') ||
      this.activeRoute.includes('/consulta-clientes')) {
      this.menuState['ventas'] = true;
    }
    if (this.activeRoute.includes('/gestion-inventario') ||
      this.activeRoute.includes('/reportes-inventario')) {
      this.menuState['inventario'] = true;
    }
  }

  isActive(path: string): boolean {
    return this.activeRoute === path;
  }

}
