import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FincasService } from '../../../shared/service/fincas/fincas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { LotesService } from '../../../shared/service/lotes/lotes.service';

@Component({
  selector: 'app-crear-lote-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './crear-lote-dialog.component.html',
  styleUrl: './crear-lote-dialog.component.css'
})
export class CrearLoteDialogComponent {
  loteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearLoteDialogComponent>,
    private fincasService: FincasService,
    private lotesService: LotesService,
    @Inject(MAT_DIALOG_DATA) public data: { idFinca: number }
  ) {
    this.loteForm = this.fb.group({
      idFinca: [data.idFinca, Validators.required],
      proposito: ['', Validators.required],
      area: [null, [Validators.required, Validators.min(1)]],
      cobertura: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() { }

  enviarLote() {
    if (this.loteForm.valid) {
      const loteData = this.loteForm.value;
      this.lotesService.postLote(loteData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Lote creado con éxito.'
          });
          this.dialogRef.close(true);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el lote.'
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
