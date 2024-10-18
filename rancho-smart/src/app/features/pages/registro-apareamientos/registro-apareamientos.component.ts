import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-registro-apareamientos',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
  ],
  templateUrl: './registro-apareamientos.component.html',
  styleUrl: './registro-apareamientos.component.css'
})
export class RegistroApareamientosComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
