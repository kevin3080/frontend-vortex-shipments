import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { API_ROUTES } from '../../../shared/constants/api';
import { LandShipmentCreatePayload, LandShipmentUpdatePayload } from '../../../shared/interfaces';
import { LandShipment } from '../components/land-shipment/land-shipment';

@Injectable({
  providedIn: 'root'
})
export class LandShipmentService {
   private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getLandShipments(): Observable<LandShipment[]> {
    return this.http.get<LandShipment[]>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}`);
  }

  getLandShipmentById(id: string): Observable<LandShipment> {
    return this.http.get<LandShipment>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}/${id}`);
  }

  createLandShipment(payload: LandShipmentCreatePayload): Observable<LandShipment> {
    return this.http.post<LandShipment>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}`, payload);
  }

  updateLandShipment(id: string, payload: LandShipmentUpdatePayload): Observable<LandShipment> {
    return this.http.put<LandShipment>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}/${id}`, payload);
  }

  deleteLandShipment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ROUTES.LAND_SHIPMENTS_URL}/${id}`);
  }
}
