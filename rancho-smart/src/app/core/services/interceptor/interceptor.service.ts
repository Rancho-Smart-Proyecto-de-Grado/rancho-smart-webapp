import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const interceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: any
): Observable<HttpEvent<any>> => {
  const platformService = inject(AuthService);

  // Verificar si estamos en un entorno de navegador antes de acceder a localStorage
  const isBrowser = platformService.isBrowser();

  // Obtener el token JWT del localStorage con la clave 'token' si estamos en un entorno de navegador
  const jwtToken = isBrowser ? localStorage.getItem('token') : null;
  
  // Definir las rutas que quieres omitir del interceptor
  const excludedUrls = [
    '/auth/login',
    '/auth/register'
  ];

  // Verificar si la URL de la petición coincide con alguna de las rutas excluidas
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    // Si la URL está excluida, pasar la petición sin modificar
    return next(req);
  }

  // Si no está excluida y el token está presente, agregar el token JWT en los encabezados
  if (jwtToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
    });
    return next(modifiedReq);
  }

  return next(req);
};