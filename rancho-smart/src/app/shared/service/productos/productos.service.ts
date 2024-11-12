import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(() => new Error('Error en la solicitud al servidor.'));
  }

  // Obtener medicamentos por usuario
  getMedicamentosUsuario(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/inventario/medicamentos/usuario/${idUsuario}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  // Obtener productos por usuario
  getProductosUsuario(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/inventario/productos/usuario/${idUsuario}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  // Obtener alimentos por usuario
  getAlimentosUsuario(idUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/inventario/alimentos/usuario/${idUsuario}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  // Crear medicamento
  crearMedicamento(data: any): Observable<any> {
    const url = `${this.apiUrl}/inventario/medicamentos`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  // Crear producto
  crearProducto(data: any): Observable<any> {
    console.log('data:', data);
    
    const url = `${this.apiUrl}/inventario/productos`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  // Crear alimento
  crearAlimento(data: any): Observable<any> {
    const url = `${this.apiUrl}/inventario/alimentos`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }
}
