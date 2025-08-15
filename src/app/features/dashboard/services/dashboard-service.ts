import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { API_ROUTES } from '../../../shared/constants/api';

interface CountResponse {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

 

  private clientsCount$!: Observable<CountResponse>;
  private landShipmentsCount$!: Observable<CountResponse>;
  private maritimeShipmentsCount$!: Observable<CountResponse>;

  getClientsCount(): Observable<CountResponse> {
    if (!this.clientsCount$) {
      this.clientsCount$ = this.http.get<any[]>(`${this.baseUrl}${API_ROUTES.CLIENTS_URL}`).pipe(
          map(data => ({ count: data.length })),
          shareReplay(1)
        );
    }
    return this.clientsCount$;
  }

  getLandShipmentsCount(): Observable<CountResponse> {
    if (!this.landShipmentsCount$) {
      this.landShipmentsCount$ = this.http.get<any[]>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}`).pipe(
        map(data => ({ count: data.length })),
        shareReplay(1)
      );
    }
    return this.landShipmentsCount$;
  }

  getMaritimeShipmentsCount(): Observable<CountResponse> {
    if (!this.maritimeShipmentsCount$) {
      this.maritimeShipmentsCount$ = this.http.get<any[]>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}`).pipe(
        map(data => ({ count: data.length })),
        shareReplay(1)
      );
    }
    return this.maritimeShipmentsCount$;
  }

  clearCache(): void {
    this.clientsCount$ = null as any;
    this.landShipmentsCount$ = null as any;
    this.maritimeShipmentsCount$ = null as any;
  }
}
