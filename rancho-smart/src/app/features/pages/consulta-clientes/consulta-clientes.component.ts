import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
  ],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
