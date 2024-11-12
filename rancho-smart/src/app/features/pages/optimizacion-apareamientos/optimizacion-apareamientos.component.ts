import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { isPlatformBrowser, NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { NavbarSuperiorComponent } from "../../../shared/components/navbar-superior/navbar-superior.component";

@Component({
  selector: 'app-optimizacion-apareamientos',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf,
    MatCardModule,
    NavbarSuperiorComponent
],
  templateUrl: './optimizacion-apareamientos.component.html',
  styleUrls: ['./optimizacion-apareamientos.component.css']
})
export class OptimizacionApareamientosComponent implements OnInit {
  user: any = {};
  fincas: any[] = [];
  selectedFinca: any = null;
  isSidebarHidden = false;


  constructor(
    private animalesService: AnimalesService,
    private fincasService: FincasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Obtener el usuario si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : {};
    }
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  ngOnInit(): void {
    // Obtener las fincas del usuario
    this.fincasService.getFincasUsuario(this.user.idUsuario).subscribe({
      next: (response) => {
        this.fincas = response;
        console.log('Fincas del usuario:', this.fincas);
      },
      error: (err) => {
        console.error('Error al obtener las fincas del usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las fincas del usuario.'
        });
      }
    });
  }

  // Manejar el cambio de finca seleccionada y obtener los animales
  onFincaChange(idFinca: number) {
    console.log('Finca seleccionada:', idFinca);
    this.animalesService.getAnimalesByFinca(idFinca).subscribe({
      next: (animales) => {
        console.log('Animales de la finca seleccionada:', animales);
      },
      error: (err) => {
        console.error('Error al obtener los animales de la finca:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los animales de la finca seleccionada.'
        });
      }
    });
  }
}
