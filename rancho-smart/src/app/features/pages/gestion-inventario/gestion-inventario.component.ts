import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductosService } from '../../../shared/service/productos/productos.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CrearAlimentoDialogComponent } from '../../components/crear-alimento-dialog/crear-alimento-dialog.component';
import { CrearMedicamentoDialogComponent } from '../../components/crear-medicamento-dialog/crear-medicamento-dialog.component';
import { CrearProductoDialogComponent } from '../../components/crear-producto-dialog/crear-producto-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { isPlatformBrowser } from '@angular/common';
import { NavbarSuperiorComponent } from "../../../shared/components/navbar-superior/navbar-superior.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    MatIconModule,
    MatMenuModule,
    NavbarSuperiorComponent,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.css']
})
export class GestionInventarioComponent implements OnInit {
  isSidebarHidden = false;
  medicamentos: any[] = [];
  productos: any[] = [];
  alimentos: any[] = [];
  user: any = {};
  idUsuario: string = '';
  filteredMedicamentos: any[] = [];
  filteredProductos: any[] = [];
  filteredAlimentos: any[] = [];

  constructor(
    private dialog: MatDialog,
    private productosService: ProductosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : {};
      this.idUsuario = this.user.idUsuario || '';
    }
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.user.idUsuario) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el usuario.',
        });
        return;
      }

      forkJoin({
        medicamentos: this.productosService.getMedicamentosUsuario(this.user.idUsuario),
        productos: this.productosService.getProductosUsuario(this.user.idUsuario),
        alimentos: this.productosService.getAlimentosUsuario(this.user.idUsuario)
      }).subscribe({
        next: (response) => {
          console.log('Datos del inventario:', response);

          // Asignar datos y inicializar filtros
          this.medicamentos = response.medicamentos;
          this.productos = response.productos;
          this.alimentos = response.alimentos;

          this.filteredMedicamentos = [...this.medicamentos];
          this.filteredProductos = [...this.productos];
          this.filteredAlimentos = [...this.alimentos];
        },
        error: (err) => {
          console.error('Error al obtener datos del inventario:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los datos del inventario.',
          });
        }
      });
    }
  }

  applyFilter(event: Event, tipo: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    switch (tipo) {
      case 'alimentos':
        this.filteredAlimentos = this.alimentos.filter(item =>
          item.nombre.toLowerCase().includes(filterValue)
        );
        break;
      case 'medicamentos':
        this.filteredMedicamentos = this.medicamentos.filter(item =>
          item.nombre.toLowerCase().includes(filterValue)
        );
        break;
      case 'productos':
        this.filteredProductos = this.productos.filter(item =>
          item.nombre.toLowerCase().includes(filterValue)
        );
        break;
    }
  }

  abrirModalCrear(tipo: string): void {
    let dialogRef;
    switch (tipo) {
      case 'alimento':
        dialogRef = this.dialog.open(CrearAlimentoDialogComponent, { width: '600px', disableClose: true });
        break;
      case 'producto':
        dialogRef = this.dialog.open(CrearProductoDialogComponent, { width: '600px', disableClose: true });
        break;
      case 'medicamento':
        dialogRef = this.dialog.open(CrearMedicamentoDialogComponent, { width: '600px', disableClose: true });
        break;
      default:
        return;
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.crearElemento(tipo, result);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  crearElemento(tipo: string, data: any): void {
    data.idUsuario = this.idUsuario;
    let servicio;

    switch (tipo) {
      case 'alimento':
        servicio = this.productosService.crearAlimento(data);
        break;
      case 'producto':
        servicio = this.productosService.crearProducto(data);
        break;
      case 'medicamento':
        servicio = this.productosService.crearMedicamento(data);
        break;
      default:
        return;
    }

    servicio.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} creado correctamente.`,
        });
        this.cargar();
      },
      error: (err) => {
        console.error(`Error al crear ${tipo}:`, err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo crear el ${tipo}.`,
        });
      },
    });
  }
}
