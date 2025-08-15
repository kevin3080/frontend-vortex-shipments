import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../../services/client-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientForm } from '../client-form/client-form';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog';
import { Client } from '../../../../shared/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-client-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientList implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  dataSource: Client[] = [];

  private clientService = inject(ClientService)
  private dialog = inject(MatDialog)

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.dataSource = clients;
      },
      error: (err) => {
        console.error('Failed to fetch clients', err);
      }
    });
  }

  openClientForm(client?: Client): void {
    const dialogRef = this.dialog.open(ClientForm, {
      width: '500px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clientService.invalidateCache();
        this.getClients();
      }
    });
  }

  openDeleteDialog(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true && client.id) {
        this.clientService.deleteClient(client.id).subscribe({
          next: () => {
            this.clientService.invalidateCache();
            this.getClients();
          },
          error: (err) => {
            console.error('Failed to delete client', err);
          }
        });
      }
    });
  }
}
