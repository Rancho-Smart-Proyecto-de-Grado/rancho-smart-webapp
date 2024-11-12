import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-alimento-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './crear-alimento-dialog.component.html',
  styleUrl: './crear-alimento-dialog.component.css'
})
export class CrearAlimentoDialogComponent implements OnInit {
  alimentoForm: FormGroup;
  fincas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearAlimentoDialogComponent>,
    private fb: FormBuilder,
    private fincasService: FincasService
  ) {
    // Inicializar el formulario
    this.alimentoForm = this.fb.group({
      idFinca: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      composicionNutricional: ['', Validators.required],
      cantidadDisponible: [0, [Validators.required, Validators.min(0)]],
      precioPorUnidad: [0, [Validators.required, Validators.min(0)]],
      fechaDeCaducidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fincasService.getFincasUsuario(user.idUsuario).subscribe({
      next: (response) => {
        this.fincas = response;
        console.log('Fincas del usuario:', this.fincas);
      },
      error: (error) => {
        console.error('Error al obtener las fincas del usuario:', error);
      }
    });
  }

  crearAlimento() {
    if (this.alimentoForm.valid) {
      this.dialogRef.close(this.alimentoForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}