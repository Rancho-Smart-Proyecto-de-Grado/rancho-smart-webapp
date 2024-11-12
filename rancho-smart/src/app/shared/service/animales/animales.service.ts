import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }
  
  // /inventario/animales/lote/2
  getAnimalesByLote(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/animales/lote/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // /inventario/crear-animal
  postAnimal(animalData: any): Observable<any> {
    console.log('Datos del animal:', animalData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/inventario/crear-animal`, animalData, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  // /inventario/animales/usuario/4
  getAnimalesByUsuario(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/animales/usuario/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // /apareamiento/cruces ´post
  postCruce(cruceData: any): Observable<any> {
    console.log('Datos del cruce:', cruceData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/apareamiento/cruces`, cruceData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // /inventario/animales/finca/43
  getAnimalesByFinca(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/animales/finca/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // /apareamiento/cruces/usuario/12
  getCrucesByUsuario(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/apareamiento/cruces/usuario/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // /inventario/animales/23
  getAnimalById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/animales/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // /ventas/animales-venta
  postVenta(ventaData: any): Observable<any> {
    console.log('Datos de la venta:', ventaData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/ventas/animales-venta`, ventaData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // /ventas/animales-venta get sin id
  getVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas/animales-venta`).pipe(
      catchError(this.handleError)
    );
  }
  
  
}
