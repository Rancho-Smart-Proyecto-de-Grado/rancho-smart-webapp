import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  private handleError(error: any): Observable<never> {
    throw error;
  }

  // /auth/login?username=prueba&password=123456789
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login?username=${username}&password=${password}`;
    return this.http.post(url, {}, { observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }



  // /auth/register?role=GANADERO_ADMINISTRADOR
  register(data: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register?role=GANADERO_ADMINISTRADOR`;
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
