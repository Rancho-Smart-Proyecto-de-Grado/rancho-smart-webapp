import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }

  // /salud/composer/historial-medico/animal/1
  getHistorialMedicoAnimal(idAnimal: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/salud/composer/historial-medico/animal/${idAnimal}`).pipe(
      catchError(this.handleError)
    );
  }

  // /salud/procedimientos-medicos post
  crearProcedimientoMedico(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salud/procedimientos-medicos`, data).pipe(
      catchError(this.handleError)
    );
  }
  

}
