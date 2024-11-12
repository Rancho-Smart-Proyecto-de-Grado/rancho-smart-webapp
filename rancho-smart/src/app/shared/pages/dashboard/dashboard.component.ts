import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { NavbarLateralComponent } from '../../components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { FincasService } from '../../service/fincas/fincas.service';
import Swal from 'sweetalert2';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { NavbarSuperiorComponent } from '../../components/navbar-superior/navbar-superior.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    MatIconModule,
    InfoCardComponent,
    NgIf,
    NgFor,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarHidden = false;
  fincas: any[] = []; // Lista para almacenar las fincas obtenidas del servicio

  constructor(
    private fincasService: FincasService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  ngOnInit(): void {
    // Verificar si estamos en un entorno de navegador antes de acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      const usuario = userData ? JSON.parse(userData) : null;

      if (usuario && usuario.idUsuario) {
        const idUsuario = usuario.idUsuario;

        // Llamar al servicio para obtener las fincas del usuario
        this.fincasService.getFincasUsuario(idUsuario).subscribe(
          (response) => {
            if (response && Array.isArray(response)) {
              // Asignar la lista de fincas a la propiedad 'fincas'
              this.fincas = response;
              console.log("Fincas obtenidas correctamente:", this.fincas);
            } else {
              Swal.fire({
                icon: 'info',
                title: 'Ten en cuenta',
                text: 'No tiene fincas creadas'
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron obtener las fincas'
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el usuario'
        });
      }
    }
  }
}
