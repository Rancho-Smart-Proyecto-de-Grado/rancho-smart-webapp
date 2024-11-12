import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FincaDialogComponent } from '../../components/finca-dialog/finca-dialog.component';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import { CrearLoteDialogComponent } from '../../components/crear-lote-dialog/crear-lote-dialog.component';

@Component({
  selector: 'app-fincas',
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
  ],
  templateUrl: './fincas.component.html',
  styleUrls: ['./fincas.component.css'],
})
export class FincasComponent implements OnInit {
  isSidebarHidden = false;
  fincaForm: FormGroup;
  fincas: any[] = []; // Lista para almacenar las fincas obtenidas del servicio

  constructor(
    private fb: FormBuilder,
    private fincasService: FincasService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializamos el formulario
    this.fincaForm = this.fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      areaTotal: [null, [Validators.required, Validators.min(0)]],
      fechaRegistro: [''],
      descripcionFinca: ['', Validators.required],
      observaciones: [''],
    });
  }

  ngOnInit() {
    this.cargarFincas();
  }

  // Método para cargar las fincas del usuario
  cargarFincas() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      const usuario = userData ? JSON.parse(userData) : null;

      if (usuario && usuario.idUsuario) {
        const idUsuario = usuario.idUsuario;

        // Mostrar SweetAlert de cargando
        Swal.fire({
          title: 'Cargando...',
          icon: 'info',
          text: 'Obteniendo datos de las fincas',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Llamar al servicio para obtener las fincas del usuario
        this.fincasService.getFincasUsuario(idUsuario).subscribe(
          (response) => {
            Swal.close(); // Cerrar SweetAlert de carga
            if (response && Array.isArray(response)) {
              this.fincas = response;
              console.log('Fincas obtenidas correctamente:', this.fincas);
            } else {
              Swal.fire({
                icon: 'info',
                title: 'Ten en cuenta',
                text: 'No tiene fincas creadas',
              });
            }
          },
          (error) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudieron obtener las fincas',
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el usuario',
        });
      }
    }
  }

  // Método para abrir el modal de creación de finca
  abrirModalFinca() {
    this.dialog.open(FincaDialogComponent, {
      width: '600px',
      disableClose: true,
    });
  }

  // Método para crear un lote y recargar las fincas después de crear
  crearLote(idFinca: number) {
    const dialogRef = this.dialog.open(CrearLoteDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { idFinca },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Lote creado con éxito.');
        // Recargar el listado de fincas
        this.cargarFincas();
      }
    });
  }

  // Método para ver los lotes de una finca
  verLotes(idFinca: number, nombreFinca: string) {
    localStorage.setItem('idFinca', idFinca.toString());
    localStorage.setItem('nombreFinca', nombreFinca);
    window.location.href = '/ver-lotes';
  }

  // Método para ocultar/mostrar la barra lateral
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
