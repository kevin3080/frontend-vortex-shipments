import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    });
    return next(authReq);
  }

  return next(req);
};
