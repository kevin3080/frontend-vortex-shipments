import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { API_ROUTES } from '../../../shared/constants/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.AUTH_URL}`;
  private readonly authTokenKey = 'authToken';

  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    console.log('login', username, password);
    return this.http.post<{ token: string }>(`${this.apiUrl}`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem(this.authTokenKey, res.token);
      })
    );
  }

  logout(showMessage: boolean = true): void {
    localStorage.removeItem(this.authTokenKey);

    if (showMessage) {
      this.snackBar.open('You have been logged out', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
