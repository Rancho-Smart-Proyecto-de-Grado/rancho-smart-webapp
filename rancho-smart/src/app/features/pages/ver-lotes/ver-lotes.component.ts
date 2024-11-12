import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import { LotesService } from '../../../shared/service/lotes/lotes.service';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { CrearAnimalDialogComponent } from '../../components/crear-animal-dialog/crear-animal-dialog.component';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';

@Component({
  selector: 'app-ver-lotes',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    InfoCardComponent,
    NgIf,
    NgFor,
    CrearAnimalDialogComponent,
  ],
  templateUrl: './ver-lotes.component.html',
  styleUrls: ['./ver-lotes.component.css'],
})
export class VerLotesComponent implements OnInit {
  nombreFinca!: string;
  lotes: any[] = [];
  isSidebarHidden = false;

  constructor(
    private lotesService: LotesService,
    private animalesService: AnimalesService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cargarLotes();
  }

  // Método para cargar los lotes y los animales
  cargarLotes() {
    if (isPlatformBrowser(this.platformId)) {
      const idFinca = localStorage.getItem('idFinca');
      this.nombreFinca = localStorage.getItem('nombreFinca') || '';

      if (idFinca) {
        // Mostrar SweetAlert de cargando
        Swal.fire({
          title: 'Cargando...',
          text: 'Obteniendo datos de los lotes y animales',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Llamar al servicio para obtener los lotes
        this.lotesService.getLoteById(idFinca).subscribe({
          next: (res: any) => {
            this.lotes = Array.isArray(res) ? res : [res];
            console.log('Lotes obtenidos:', this.lotes);

            // Obtener la cantidad de animales para cada lote
            this.lotes.forEach((lote) => {
              this.animalesService.getAnimalesByLote(lote.idLote).subscribe({
                next: (res: any) => {
                  lote.cantidadAnimales = Array.isArray(res) ? res.length : 0;
                },
                error: (error) => {
                  if (error.status === 404) {
                    lote.cantidadAnimales = 0;
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'No se pudieron obtener los animales.',
                    });
                  }
                },
              });
            });

            Swal.close(); // Cerrar SweetAlert de carga
          },
          error: (error) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron obtener los lotes.',
            });
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el ID de la finca.',
        });
      }
    }
  }

  // Método para ocultar/mostrar la barra lateral
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  // Método para ver los animales de un lote
  verAnimales(idLote: number) {
    localStorage.setItem('idLote', idLote.toString());
    window.location.href = '/ver-animales';
  }

  // Método para abrir el diálogo de creación de animal y recargar los lotes después
  abrirModalCrearAnimal(idLote: number) {
    console.log('ID Lote:', idLote);
    const dialogRef = this.dialog.open(CrearAnimalDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { idLote },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El animal fue creado correctamente.',
        });
        // Recargar el listado de lotes y animales
        this.cargarLotes();
      }
    });
  }
}
