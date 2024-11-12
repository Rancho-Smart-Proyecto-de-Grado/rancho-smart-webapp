import { Component, OnInit } from '@angular/core';
import { VacunasService } from '../../../shared/service/vacunas/vacunas.service';
import { TratamientosService } from '../../../shared/service/tratamientos/tratamientos.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-crear-vacunas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
  ],
  templateUrl: './crear-vacunas.component.html',
  styleUrl: './crear-vacunas.component.css'
})
export class CrearVacunasComponent implements OnInit {
  vacunaForm: FormGroup;
  tratamientos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearVacunasComponent>,
    private fb: FormBuilder,
    private tratamientosService: TratamientosService
  ) {
    // Inicializar el formulario
    this.vacunaForm = this.fb.group({
      idTratamiento: [null, Validators.required],
      nombre: ['', Validators.required],
      cantidadDosis: [1, [Validators.required, Validators.min(1)]],
      vacunacionCompletada: [false],
      fechaAdministracion: ['', Validators.required],
      fechaProximaDosis: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener la lista de tratamientos para mostrar en el select
    this.tratamientosService.obtenerTratamientos().subscribe((data: any) => {
      this.tratamientos = data;
      console.log('Tratamientos:', this.tratamientos);
    });
  }

  guardarVacuna() {
    if (this.vacunaForm.valid) {
      const vacunaData = this.vacunaForm.value;

      // Convertir las fechas al formato ISO 8601
      vacunaData.fechaAdministracion = new Date(vacunaData.fechaAdministracion).toISOString();
      vacunaData.fechaProximaDosis = new Date(vacunaData.fechaProximaDosis).toISOString();

      console.log('Datos de la vacuna:', vacunaData);
      this.dialogRef.close(vacunaData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
