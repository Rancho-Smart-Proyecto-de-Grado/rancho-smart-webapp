import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnimalesService } from '../../service/animales/animales.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarSuperiorLandpageComponent } from '../../components/navbar-superior-landpage/navbar-superior-landpage.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    NavbarSuperiorLandpageComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  ventas: any[] = [];
  ventasFiltradas: any[] = [];
  busquedaControl = new FormControl('');
  imagenes: string[] = [
    'vacas/free-photo-of-animal-granja-vaca-ganado.jpeg',
    'vacas/free-photo-of-naturaleza-campo-animal-exterior.jpeg',
    'vacas/free-photo-of-vaca-moteada-pastando-en-un-prado-soleado.jpeg',
    'vacas/pexels-photo-4472970.jpeg',
    'vacas/pexels-photo-8432540.jpeg',
  ];

  constructor(private animalesService: AnimalesService) {}

  ngOnInit(): void {
    this.animalesService.getVentas().subscribe({
      next: (ventas) => {
        this.ventas = ventas.map((venta: any) => ({
          ...venta,
          imagen: this.obtenerImagenAleatoria(),
        }));
        this.ventasFiltradas = this.ventas;
      },
      error: (err) => {
        console.error('Error al obtener ventas:', err);
      },
    });

    this.busquedaControl.valueChanges.subscribe((valor) => {
      this.filtrarVentas(valor ?? '');
    });
  }

  filtrarVentas(valor: string): void {
    const busqueda = valor.toLowerCase();
    this.ventasFiltradas = this.ventas.filter((venta) =>
      venta.descripcion.toLowerCase().includes(busqueda)
    );
  }

  obtenerImagenAleatoria(): string {
    const indice = Math.floor(Math.random() * this.imagenes.length);
    return this.imagenes[indice];
  }
}
