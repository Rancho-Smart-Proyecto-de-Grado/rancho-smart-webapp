import { Component } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-reportes-inventario',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule
    
  ],
  templateUrl: './reportes-inventario.component.html',
  styleUrl: './reportes-inventario.component.css'
})
export class ReportesInventarioComponent {
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
