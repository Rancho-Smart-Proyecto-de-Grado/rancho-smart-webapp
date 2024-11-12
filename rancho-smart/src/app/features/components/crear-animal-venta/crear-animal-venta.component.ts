import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import Swal from 'sweetalert2';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-animal-venta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './crear-animal-venta.component.html',
  styleUrls: ['./crear-animal-venta.component.css']
})
export class CrearAnimalVentaComponent implements OnInit {
  ventaForm: FormGroup;
  fincas: any[] = [];
  animales: any[] = [];
  selectedFinca: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<CrearAnimalVentaComponent>,
    private fb: FormBuilder,
    private fincasService: FincasService,
    private animalesService: AnimalesService
  ) {
    this.ventaForm = this.fb.group({
      idAnimal: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      moneda: ['PESO_COLOMBIANO', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Cargar fincas del usuario
    this.fincasService.getFincasUsuario(user.idUsuario).subscribe({
      next: (fincas) => {
        this.fincas = fincas;
        console.log('Fincas del usuario:', this.fincas);
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

  // Manejar cambio de finca seleccionada
  onFincaChange(idFinca: number) {
    this.selectedFinca = idFinca;
    this.animalesService.getAnimalesByFinca(idFinca).subscribe({
      next: (animales) => {
        this.animales = animales;
        console.log('Animales de la finca seleccionada:', this.animales);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los animales de la finca seleccionada.'
        });
      }
    });
  }

  guardarVenta() {
    if (this.ventaForm.valid && this.selectedFinca) {
      const ventaData = {
        ...this.ventaForm.value,
        idFinca: this.selectedFinca
      };
      console.log('Datos de la venta:', ventaData);
      this.dialogRef.close(ventaData);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
