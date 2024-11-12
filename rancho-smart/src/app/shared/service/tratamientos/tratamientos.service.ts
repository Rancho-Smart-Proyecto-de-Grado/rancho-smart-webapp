import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }

  // /salud/tratamientos post
  crearTratamiento(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salud/tratamientos`, data).pipe(
      catchError(this.handleError)
    );
  }

  // /salud/tratamientos get
  obtenerTratamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/salud/tratamientos`).pipe(
      catchError(this.handleError)
    );
  }
  
}
