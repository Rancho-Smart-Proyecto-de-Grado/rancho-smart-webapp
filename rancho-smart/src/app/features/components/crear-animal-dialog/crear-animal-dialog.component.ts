import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { LotesService } from '../../../shared/service/lotes/lotes.service';
import { AnimalesService } from '../../../shared/service/animales/animales.service';


@Component({
  selector: 'app-crear-animal-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './crear-animal-dialog.component.html',
  styleUrl: './crear-animal-dialog.component.css'
})
export class CrearAnimalDialogComponent {
  animalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearAnimalDialogComponent>,
    private animalesService: AnimalesService,
    @Inject(MAT_DIALOG_DATA) public data: { idLote: string } // <- Aquí inyectas los datos correctamente
  ) {
    this.animalForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      raza: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      etapa: ['', Validators.required],
      idUsuario: [''],
      idFinca: [''],
      idLote: [''],
      foto: [null]
    });
  }

  ngOnInit(): void {
    // Obtener idUsuario e idFinca del localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const idFinca = localStorage.getItem('idFinca');
    const idLote = this.data.idLote; // <- Aquí obtienes el idLote correctamente

    console.log('Datos recibidos en el modal:', this.data);

    if (user?.idUsuario && idFinca && idLote) {
      this.animalForm.patchValue({
        idUsuario: user.idUsuario,
        idFinca: idFinca,
        idLote: idLote
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la información requerida.'
      });
      this.dialogRef.close();
    }
  }

  crearAnimal(): void {
    if (this.animalForm.valid) {
      const animalData = this.animalForm.value;
  
      // Convertir la fecha a formato ISO (YYYY-MM-DDTHH:mm:ss)
      const fechaNacimiento = new Date(animalData.fechaNacimiento);
      const formattedDate = fechaNacimiento.toISOString().split('.')[0]; // Esto elimina la parte de milisegundos
  
      // Asignar la fecha formateada
      animalData.fechaNacimiento = formattedDate;
  
      console.log('Datos del animal a enviar:', animalData);
  
      this.animalesService.postAnimal(animalData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Animal registrado con éxito.'
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al registrar el animal:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el animal.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Incompleto',
        text: 'Por favor completa todos los campos obligatorios.'
      });
    }
  }

  
}