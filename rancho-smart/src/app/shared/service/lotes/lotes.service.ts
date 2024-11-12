import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LotesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }

  // http://localhost:8080/inventario/lotes post
  postLote(loteData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/inventario/lotes`, loteData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // /inventario/lotes/52
  getLoteById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/lotes/${id}`).pipe(
      catchError(this.handleError)
    );
  }


}
