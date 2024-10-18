import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-reportes-produccion',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
  ],
  templateUrl: './reportes-produccion.component.html',
  styleUrl: './reportes-produccion.component.css'
})
export class ReportesProduccionComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
