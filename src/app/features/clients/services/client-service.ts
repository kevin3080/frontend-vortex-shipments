import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { API_ROUTES } from '../../../shared/constants/api';
import { environment } from '../../../../environments/environments';
import { Client } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}${API_ROUTES.CLIENTS_URL}`;
  private http = inject(HttpClient);
  private clientsObservable: Observable<Client[]> | null = null;
  
  getClients(): Observable<Client[]> {
     this.clientsObservable ??= this.http.get<Client[]>(this.apiUrl).pipe(
        shareReplay(1) 
      );
    return this.clientsObservable;
  }

  addClient(client: Omit<Client, 'id'>): Observable<Client> {
    console.log(client);
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  invalidateCache() {
    this.clientsObservable = null;
  }
}