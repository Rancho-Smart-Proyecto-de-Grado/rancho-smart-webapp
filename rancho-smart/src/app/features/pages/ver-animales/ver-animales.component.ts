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
import { LotesService } from '../../../shared/service/lotes/lotes.service';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { CrearAnimalDialogComponent } from '../../components/crear-animal-dialog/crear-animal-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ver-animales',
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
    InfoCardComponent,
    NgIf,
    NgFor,
    CrearAnimalDialogComponent,
    MatTableModule
  ],
  templateUrl: './ver-animales.component.html',
  styleUrl: './ver-animales.component.css'
})
export class VerAnimalesComponent {
  nombreFinca!: string;
  idLote!: string;
  isSidebarHidden = false;
  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'nombre',
    'genero',
    'raza',
    'etapa',
    'fechaNacimiento',
  ];

  constructor(
    private animalesService: AnimalesService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.idLote = localStorage.getItem('idLote') || '';

      this.nombreFinca = localStorage.getItem('nombreFinca') || '';
      this.animalesService.getAnimalesByLote(this.idLote).subscribe({
        next: (res: any) => {
          console.log('Animales obtenidos:', res);
          this.dataSource.data = res;
        },
        error: (err: any) => {
          console.error('Error al obtener los animales:', err);
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


  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
