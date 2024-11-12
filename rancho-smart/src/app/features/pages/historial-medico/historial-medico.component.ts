import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { CrearAnimalDialogComponent } from '../../components/crear-animal-dialog/crear-animal-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { MatSelectModule } from '@angular/material/select';
import { HistorialMedicoService } from '../../../shared/service/historial-medico/historial-medico.service';
import { HistorialMedicoDialogComponent } from '../../components/historial-medico-dialog/historial-medico-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CrearTratamientoDialogComponent } from '../../components/crear-tratamiento-dialog/crear-tratamiento-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CrearConsultaGeneralComponent } from '../../components/crear-consulta-general/crear-consulta-general.component';
import { TratamientosService } from '../../../shared/service/tratamientos/tratamientos.service';
import { CrearVacunasComponent } from '../../components/crear-vacunas/crear-vacunas.component';
import { VacunasService } from '../../../shared/service/vacunas/vacunas.service';

@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgFor,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './historial-medico.component.html',
  styleUrl: './historial-medico.component.css'
})
export class HistorialMedicoComponent {
  nombreFinca!: string;
  idLote!: string;
  isSidebarHidden = false;
  dataSource = new MatTableDataSource<any>([]);
  selectedColumn: string = 'nombreFinca';

  displayedColumns: string[] = [
    'nombreFinca',
    'idLote',
    'nombre',
    'genero',
    'raza',
    'etapa',
    'fechaNacimiento',
    'acciones'
  ];

  filterableColumns = [
    { value: 'nombreFinca', viewValue: 'Nombre de la Finca' },
    { value: 'idLote', viewValue: 'ID del Lote' },
    { value: 'nombre', viewValue: 'Nombre' },
    { value: 'genero', viewValue: 'Género' },
    { value: 'raza', viewValue: 'Raza' },
    { value: 'etapa', viewValue: 'Etapa' },
    { value: 'fechaNacimiento', viewValue: 'Fecha de Nacimiento' }
  ];

  constructor(
    private animalesService: AnimalesService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fincasService: FincasService,
    private historialMedicoService: HistorialMedicoService,
    private tratamientosService: TratamientosService,
    private vacunasService: VacunasService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      const idUsuario = JSON.parse(user || '{}').idUsuario;

      this.fincasService.getFincasUsuario(idUsuario).subscribe({
        next: (fincas: any[]) => {
          this.animalesService.getAnimalesByUsuario(idUsuario).subscribe({
            next: (animales: any[]) => {
              const animalesConFinca = animales.map(animal => {
                const finca = fincas.find(f => f.idFinca == animal.idFinca);
                return {
                  ...animal,
                  nombreFinca: finca ? finca.nombre : 'Finca desconocida'
                };
              });

              this.dataSource.data = animalesConFinca;
            },
            error: (err: any) => {
              console.error('Error al obtener los animales:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la lista de animales.'
              });
            }
          });
        },
        error: (err: any) => {
          console.error('Error al obtener las fincas:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la lista de fincas.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el ID de la finca.'
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const columnValue = data[this.selectedColumn]?.toString().toLowerCase() || '';
      return columnValue.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  verIdAnimal(idAnimal: number): void {
    this.historialMedicoService.getHistorialMedicoAnimal(idAnimal).subscribe({
      next: (historialMedico: any) => {
        console.log('Historial médico:', historialMedico);
        this.dialog.open(HistorialMedicoDialogComponent, {
          width: '600px',
          data: historialMedico,
        });
      },
      error: (err: any) => {
        console.error('Error al obtener el historial médico:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el historial médico.',
        });
      },
    });
  }



  crearHistorialMedico(idAnimal: number): void {
    console.log('Crear historial médico para el animal con ID:', idAnimal);
  }
  
  anadirTratamiento(idAnimal: number): void {
    let idHistorialMedico: number;
    this.historialMedicoService.getHistorialMedicoAnimal(idAnimal).subscribe({
      next: (historialMedico: any) => {
        console.log('Historial médico:', historialMedico);
        idHistorialMedico = historialMedico.idHistorialMedico;
      },
      error: (err: any) => {        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el historial médico.',
        });
      },
    });
    const dialogRef = this.dialog.open(CrearTratamientoDialogComponent, {
      width: '600px',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.idHistorialMedico = idHistorialMedico;
        console.log('Datos recibidos del tratamiento:', result);
        this.tratamientosService.crearTratamiento(result).subscribe({
          next: (response: any) => {
            console.log('Respuesta del backend:', response);
            Swal.fire({
              icon: 'success',
              title: 'Consulta general creada',
              text: 'La consulta general se ha creado correctamente.',
            });
          },
          error: (err: any) => {
            console.error('Error al crear la consulta general:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear la consulta general.',
            });
          },
        });
      }
    });    
  }
  
  anadirConsultaGeneral(idAnimal: number): void {
    let idHistorialMedico: number;
    this.historialMedicoService.getHistorialMedicoAnimal(idAnimal).subscribe({
      next: (historialMedico: any) => {
        console.log('Historial médico:', historialMedico);
        idHistorialMedico = historialMedico.idHistorialMedico;
      },
      error: (err: any) => {        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el historial médico.',
        });
      },
    });
    const dialogRef = this.dialog.open(CrearConsultaGeneralComponent, {
      width: '600px',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.idHistorialMedico = idHistorialMedico;
        console.log('Datos recibidos del tratamiento:', result);
        this.historialMedicoService.crearProcedimientoMedico(result).subscribe({
          next: (response: any) => {
            console.log('Respuesta del backend:', response);
            Swal.fire({
              icon: 'success',
              title: 'Consulta general creada',
              text: 'La consulta general se ha creado correctamente.',
            });
          },
          error: (err: any) => {
            console.error('Error al crear la consulta general:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear la consulta general.',
            });
          },
        });
      }
    });
  }
  
  anadirVacuna(idAnimal: number): void {
    let idHistorialMedico: number;
    this.historialMedicoService.getHistorialMedicoAnimal(idAnimal).subscribe({
      next: (historialMedico: any) => {
        console.log('Historial médico:', historialMedico);
        idHistorialMedico = historialMedico.idHistorialMedico;
      },
      error: (err: any) => {        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el historial médico.',
        });
      },
    });
    const dialogRef = this.dialog.open(CrearVacunasComponent, {
      width: '600px',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.idHistorialMedico = idHistorialMedico;
        console.log('Datos recibidos del tratamiento:', result);
        this.vacunasService.crearVacuna(result).subscribe({
          next: (response: any) => {
            console.log('Respuesta del backend:', response);
            Swal.fire({
              icon: 'success',
              title: 'Consulta general creada',
              text: 'La consulta general se ha creado correctamente.',
            });
          },
          error: (err: any) => {
            console.error('Error al crear la consulta general:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear la consulta general.',
            });
          },
        });
      }
    });    
  }
  
  consultaGeneral2(idAnimal: number): void {
    console.log('Consulta general 2 para el animal con ID:', idAnimal);
  }
  




}
