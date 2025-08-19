import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { API_ROUTES } from '../../../shared/constants/api';
import { MaritimeShipmentCreatePayload, MaritimeShipmentUpdatePayload } from '../../../shared/interfaces';
import { MaritimeShipments } from '../components/maritime-shipments/maritime-shipments';

@Injectable({
  providedIn: 'root'
})
export class MaritimeShipmentsService {
 private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getMaritimeShipments(): Observable<MaritimeShipments[]> {
    return this.http.get<MaritimeShipments[]>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}`);
  }

  getMaritimeShipmentById(id: string): Observable<MaritimeShipments> {
    return this.http.get<MaritimeShipments>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}/${id}`);
  }

  createMaritimeShipment(payload: MaritimeShipmentCreatePayload): Observable<MaritimeShipments> {
    return this.http.post<MaritimeShipments>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}`, payload);
  }

  updateMaritimeShipment(id: string, payload: MaritimeShipmentUpdatePayload): Observable<MaritimeShipments> {
    return this.http.put<MaritimeShipments>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}/${id}`, payload);
  }

  deleteMaritimeShipment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ROUTES.MARITIME_SHIPMENTS_URL}/${id}`);
  }
}
