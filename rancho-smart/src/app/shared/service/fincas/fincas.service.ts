import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FincasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }

  // /infraestructura/fincas/usuario/14
  getFincasUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/infraestructura/fincas/usuario/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  postFinca(finca: any): Observable<any> {
    const url = `${this.apiUrl}/infraestructura/fincas`;
    return this.http.post(url, finca).pipe(
      catchError((error) => {
        console.error('Error en el servicio:', error);
        throw error;
      })
    );
  }

  
}
