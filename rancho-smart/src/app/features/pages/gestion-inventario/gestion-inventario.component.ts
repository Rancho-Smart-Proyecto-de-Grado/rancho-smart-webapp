import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
  ],
  templateUrl: './gestion-inventario.component.html',
  styleUrl: './gestion-inventario.component.css'
})
export class GestionInventarioComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
