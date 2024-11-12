import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductosService } from '../../../shared/service/productos/productos.service';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-producto-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './crear-producto-dialog.component.html',
  styleUrls: ['./crear-producto-dialog.component.css']
})
export class CrearProductoDialogComponent implements OnInit {
  productoForm: FormGroup;
  fincas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearProductoDialogComponent>,
    private fb: FormBuilder,
    private productosService: ProductosService,
    private fincasService: FincasService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      fechaRegistro: ['', Validators.required],
      idFinca: ['', Validators.required]
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

  crearProducto() {
    if (this.productoForm.valid) {
      const formData = this.productoForm.value;

      // Convertir fechaRegistro a formato ISO 8601 con hora
      const fecha = new Date(formData.fechaRegistro);
      formData.fechaRegistro = fecha.toISOString();

      console.log('Datos del producto a enviar:', formData);
      this.dialogRef.close(formData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
