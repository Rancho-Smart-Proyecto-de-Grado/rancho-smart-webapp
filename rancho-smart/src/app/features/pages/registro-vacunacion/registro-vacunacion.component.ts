import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-vacunacion',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule

  ],
  templateUrl: './registro-vacunacion.component.html',
  styleUrl: './registro-vacunacion.component.css'
})
export class RegistroVacunacionComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
