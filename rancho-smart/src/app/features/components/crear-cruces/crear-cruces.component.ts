import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { AnimalesService } from '../../../shared/service/animales/animales.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-cruces',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgForOf,
  ],
  templateUrl: './crear-cruces.component.html',
  styleUrl: './crear-cruces.component.css'
})
export class CrearCrucesComponent implements OnInit {
  cruceForm: FormGroup;
  fincas: any[] = [];
  animales: any[] = [];
  machos: any[] = [];
  hembras: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CrearCrucesComponent>,
    private fb: FormBuilder,
    private fincasService: FincasService,
    private animalesService: AnimalesService
  ) {
    this.cruceForm = this.fb.group({
      idFinca: [null, Validators.required],
      idMadre: [null, Validators.required],
      idPadre: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Obtener las fincas del usuario
    this.fincasService.getFincasUsuario(user.idUsuario).subscribe((response: any) => {
      this.fincas = response;
      console.log('Fincas del usuario:', this.fincas);
    });
  }

  // Método para cargar los animales de la finca seleccionada
  onFincaChange(idFinca: number) {
    this.animalesService.getAnimalesByFinca(idFinca).subscribe((response: any) => {
      this.animales = response;
      this.machos = this.animales.filter((animal) => animal.genero === 'M');
      this.hembras = this.animales.filter((animal) => animal.genero === 'H');
      console.log('Machos:', this.machos);
      console.log('Hembras:', this.hembras);
    });
  }

  guardarCruce() {
    if (this.cruceForm.valid) {
      const cruceData = {
        idMadre: this.cruceForm.value.idMadre,
        idPadre: this.cruceForm.value.idPadre,
        padre: 'Toro Campeón', // Valor por defecto
        fecha: new Date().toISOString(), // Fecha actual automática
        exito: true, // Valor siempre true
        ejecutado: true, // Valor siempre true
        calificacion: 9, // Valor por defecto 9
        idUsuario: JSON.parse(localStorage.getItem('user') || '{}').idUsuario,
        idFinca: this.cruceForm.value.idFinca,
      };

      console.log('Datos del cruce:', cruceData);
      this.dialogRef.close(cruceData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}