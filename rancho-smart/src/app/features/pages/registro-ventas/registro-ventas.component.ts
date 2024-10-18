import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule

  ],
  templateUrl: './registro-ventas.component.html',
  styleUrl: './registro-ventas.component.css'
})
export class RegistroVentasComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
