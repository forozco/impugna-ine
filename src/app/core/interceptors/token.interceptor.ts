import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('🔗 [TokenInterceptor] Interceptando request:', {
    url: req.url,
    method: req.method,
    hasToken: !!token,
    timestamp: new Date().toISOString()
  });

  if (token) {
    console.log('🔑 [TokenInterceptor] Agregando token Bearer a la request');
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    tap({
      next: (response) => {
        console.log('📥 [TokenInterceptor] Respuesta recibida:', {
          url: req.url,
          status: (response as any)?.status,
          response: response,
          timestamp: new Date().toISOString()
        });
      },
      error: (error) => {
        console.error('[TokenInterceptor] Error en la request:', {
          url: req.url,
          error: error,
          status: error?.status,
          message: error?.message,
          timestamp: new Date().toISOString()
        });
      }
    })
  );
};
