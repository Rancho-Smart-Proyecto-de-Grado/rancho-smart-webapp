import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductosService } from '../../../shared/service/productos/productos.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-tratamiento-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
    
  ],
  templateUrl: './crear-tratamiento-dialog.component.html',
  styleUrls: ['./crear-tratamiento-dialog.component.css'],
})
export class CrearTratamientoDialogComponent implements OnInit {
  tratamientoForm: FormGroup;
  medicamentos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearTratamientoDialogComponent>,
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    // Inicializar el formulario
    this.tratamientoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      listadoMedicamentos: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Cargar los medicamentos del usuario
    this.productosService.getMedicamentosUsuario(user.idUsuario).subscribe((medicamentos) => {
      this.medicamentos = medicamentos;
      console.log('Medicamentos:', this.medicamentos);
    });
  }

  // Método para obtener el FormArray
  get listadoMedicamentos(): FormArray {
    return this.tratamientoForm.get('listadoMedicamentos') as FormArray;
  }

  // Método para convertir AbstractControl a FormGroup
  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  agregarMedicamento() {
    const medicamentoForm = this.fb.group({
      idMedicamento: ['', Validators.required],
      dosisRecomendada: [0, [Validators.required, Validators.min(0.1)]],
      frecuencia: ['', Validators.required],
      observaciones: [''],
    });

    this.listadoMedicamentos.push(medicamentoForm);
  }

  eliminarMedicamento(index: number) {
    this.listadoMedicamentos.removeAt(index);
  }

  guardarTratamiento() {
    if (this.tratamientoForm.valid) {
      const tratamientoData = this.tratamientoForm.value;
      tratamientoData.fechaInicio = new Date(tratamientoData.fechaInicio).toISOString();
      tratamientoData.fechaFin = new Date(tratamientoData.fechaFin).toISOString();

      console.log('Datos del tratamiento:', tratamientoData);
      this.dialogRef.close(tratamientoData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
