import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { CrearCrucesComponent } from '../../components/crear-cruces/crear-cruces.component';
import { NavbarSuperiorComponent } from "../../../shared/components/navbar-superior/navbar-superior.component";
import Swal from 'sweetalert2';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { CommonModule, isPlatformBrowser, NgForOf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { MatSelectModule } from '@angular/material/select';
import { CrearAnimalVentaComponent } from '../../components/crear-animal-venta/crear-animal-venta.component';

@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule,
    MatDialogModule,
    NavbarSuperiorComponent,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './registro-ventas.component.html',
  styleUrl: './registro-ventas.component.css'
})
export class RegistroVentasComponent implements OnInit {
  user: any = {};
  fincas: any[] = [];
  misVentas: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombreAnimal', 'descripcion', 'precio', 'moneda'];
  isSidebarHidden = false;


  constructor(
    private animalesService: AnimalesService,
    private fincasService: FincasService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public dialog: MatDialog
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : {};
    }
  }

  ngOnInit(): void {
    // Obtener todas las fincas del usuario
    this.fincasService.getFincasUsuario(this.user.idUsuario).subscribe({
      next: (fincas) => {
        this.fincas = fincas;

        // Obtener todas las ventas
        this.animalesService.getVentas().subscribe({
          next: (ventas) => {
            const ventasFiltradas: any[] = [];

            ventas.forEach((venta: { idAnimal: any; }) => {
              this.animalesService.getAnimalById(venta.idAnimal).subscribe({
                next: (animal) => {
                  const esDeMiFinca = this.fincas.some((finca) => finca.idFinca === animal.idFinca);
                  if (esDeMiFinca) {
                    ventasFiltradas.push({
                      ...venta,
                      nombreAnimal: animal.nombre,
                      idFinca: animal.idFinca
                    });
                  }

                  // Actualizar el dataSource con las ventas filtradas
                  this.dataSource.data = ventasFiltradas;
                },
                error: (err) => {
                  console.error(`Error al obtener el animal con ID ${venta.idAnimal}:`, err);
                }
              });
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron cargar las ventas.'
            });
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las fincas del usuario.'
        });
      }
    });
  }

  abrirModalVenta() {
    const dialogRef = this.dialog.open(CrearAnimalVentaComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((ventaData) => {
      if (ventaData) {
        this.animalesService.postVenta(ventaData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Venta registrada',
              text: 'La venta se registró correctamente.'
            });
            this.ngOnInit(); // Recargar datos
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al registrar la venta.'
            });
          }
        });
      }
    });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

}