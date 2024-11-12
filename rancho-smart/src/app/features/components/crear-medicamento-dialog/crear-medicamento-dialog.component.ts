import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crear-medicamento-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './crear-medicamento-dialog.component.html',
  styleUrls: ['./crear-medicamento-dialog.component.css']
})
export class CrearMedicamentoDialogComponent implements OnInit {
  medicamentoForm: FormGroup;
  fincas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearMedicamentoDialogComponent>,
    private fb: FormBuilder,
    private fincasService: FincasService
  ) {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      fabricante: ['', Validators.required],
      fechaFabricacion: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      viaAdministracion: ['', Validators.required],
      idFinca: ['', Validators.required] // Nuevo campo para seleccionar la finca
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

  crearMedicamento() {
    if (this.medicamentoForm.valid) {
      const formData = this.medicamentoForm.value;
      console.log('Datos del medicamento a enviar:', formData);
      this.dialogRef.close(formData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
