import { NgForOf, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-historial-medico-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatExpansionModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './historial-medico-dialog.component.html',
  styleUrl: './historial-medico-dialog.component.css'
})
export class HistorialMedicoDialogComponent {
  historialMedico: any;

  constructor(
    public dialogRef: MatDialogRef<HistorialMedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.historialMedico = data;
  }

  ngOnInit(): void {
    console.log('Datos del historial médico:', this.historialMedico);
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}