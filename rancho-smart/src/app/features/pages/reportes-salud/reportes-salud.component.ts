import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-reportes-salud',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule

  ],
  templateUrl: './reportes-salud.component.html',
  styleUrl: './reportes-salud.component.css'
})
export class ReportesSaludComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
