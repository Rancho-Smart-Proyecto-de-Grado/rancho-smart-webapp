import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { MatIconModule } from '@angular/material/icon';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-finca-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './finca-dialog.component.html',
  styleUrl: './finca-dialog.component.css'
})
export class FincaDialogComponent {
  fincaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fincasService: FincasService,
    public dialogRef: MatDialogRef<FincaDialogComponent>
  ) {
    this.fincaForm = this.fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      areaTotal: [null, [Validators.required, Validators.min(0)]],
      fechaRegistro: [''],
      descripcionFinca: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.idUsuario) {
      this.fincaForm.patchValue({
        idUsuario: user.idUsuario,
        fechaRegistro: new Date().toISOString().slice(0, 16)
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró un usuario válido.'
      });
    }
  }

  enviarFinca() {
    if (this.fincaForm.valid) {
      const fincaData = { ...this.fincaForm.value, foto: null };
      this.fincasService.postFinca(fincaData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Finca registrada con éxito.'
          });
          this.dialogRef.close();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al registrar la finca.'
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