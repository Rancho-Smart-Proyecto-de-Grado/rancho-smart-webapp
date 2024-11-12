import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { CrearCrucesComponent } from '../../components/crear-cruces/crear-cruces.component';
import { NavbarSuperiorComponent } from "../../../shared/components/navbar-superior/navbar-superior.component";
import Swal from 'sweetalert2';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-registro-genealogia',
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
    MatCardModule
  ],
  templateUrl: './registro-genealogia.component.html',
  styleUrls: ['./registro-genealogia.component.css']
})
export class RegistroGenealogiaComponent implements OnInit {
  isSidebarHidden = false;
  user: any = {};
  cruces: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombreMadre', 'nombrePadre', 'fecha'];

  constructor(
    public dialog: MatDialog,
    private animalesService: AnimalesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : {};
    }
  }

  ngOnInit(): void {
    // Obtener los cruces del usuario
    this.animalesService.getCrucesByUsuario(this.user.idUsuario).subscribe({
      next: (response) => {
        console.log('Cruces del usuario:', response);
        this.cruces = response;
        this.obtenerNombresAnimales(this.cruces);
      },
      error: (err) => {
        console.error('Error al obtener los cruces:', err);
      }
    });
  }

  obtenerNombresAnimales(cruces: any[]) {
    const updatedCruces = cruces.map(async (cruce) => {
      const madre = await this.animalesService.getAnimalById(cruce.idMadre).toPromise();
      const padre = await this.animalesService.getAnimalById(cruce.idPadre).toPromise();
      
      return {
        ...cruce,
        nombreMadre: madre.nombre,
        nombrePadre: padre.nombre,
      };
    });

    Promise.all(updatedCruces).then((result) => {
      this.dataSource.data = result;
    });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  abrirModalCruces() {
    const dialogRef = this.dialog.open(CrearCrucesComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((cruceData) => {
      if (cruceData) {
        this.animalesService.postCruce(cruceData).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'El cruce se ha registrado correctamente.',
            });
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo registrar el cruce. Intenta nuevamente.',
            });
          }
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}