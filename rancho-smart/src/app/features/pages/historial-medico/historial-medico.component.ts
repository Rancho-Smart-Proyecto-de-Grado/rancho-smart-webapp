import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
  ],
  templateUrl: './historial-medico.component.html',
  styleUrl: './historial-medico.component.css'
})
export class HistorialMedicoComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
