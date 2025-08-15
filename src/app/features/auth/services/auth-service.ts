import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { API_ROUTES } from '../../../shared/constants/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.AUTH_URL}`;
  private readonly authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    console.log('login', username, password);
    return this.http.post<{ token: string }>(`${this.apiUrl}`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem(this.authTokenKey, res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
