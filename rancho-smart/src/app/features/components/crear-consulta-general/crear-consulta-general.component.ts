import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CrearTratamientoDialogComponent } from '../crear-tratamiento-dialog/crear-tratamiento-dialog.component';

@Component({
  selector: 'app-crear-consulta-general',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-consulta-general.component.html',
  styleUrl: './crear-consulta-general.component.css'
})
export class CrearConsultaGeneralComponent {
  tratamientoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearTratamientoDialogComponent>,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario sin el campo de fecha
    this.tratamientoForm = this.fb.group({
      resultados: ['', Validators.required],
      recomendaciones: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  guardarTratamiento() {
    if (this.tratamientoForm.valid) {
      const tratamientoData = this.tratamientoForm.value;

      // Asignar la fecha actual automáticamente en formato ISO 8601
      tratamientoData.fecha = new Date().toISOString();

      console.log('Datos del tratamiento:', tratamientoData);
      this.dialogRef.close(tratamientoData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
