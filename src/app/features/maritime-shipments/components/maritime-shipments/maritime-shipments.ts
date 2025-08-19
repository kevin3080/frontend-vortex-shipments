import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog';
import { MaritimeShipmentsService } from '../../services/maritime-shipments-service';
import { MaritimeShipmentForm } from '../maritime-shipment-form/maritime-shipment-form';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-maritime-shipments',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './maritime-shipments.html',
  styleUrl: './maritime-shipments.scss'
})
export class MaritimeShipments implements OnInit, OnDestroy {
    private maritimeShipmentService = inject(MaritimeShipmentsService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  public maritimeShipments$: Observable<MaritimeShipments[]> | undefined;
  public displayedColumns: string[] = ['client', 'product', 'port', 'quantity', 'shippingCost', 'fleetNumber', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.maritimeShipments$ = this.maritimeShipmentService.getMaritimeShipments();
  }

  onNewShipment(): void {
    const dialogRef = this.dialog.open(MaritimeShipmentForm, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onEdit(maritimeShipment: MaritimeShipments): void {
    console.log('Editar envío marítimo:', maritimeShipment);
    // TODO: Implementar edición
  }

  private confirmAndExecute(action: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        action();
      }
    });
  }

  onDelete(maritimeShipmentId: string): void {
    this.confirmAndExecute(() => {
      this.maritimeShipmentService.deleteMaritimeShipment(maritimeShipmentId).subscribe({
        next: () => {
          this.fetchData();
        },
        error: (error) => {
          console.error('Error al eliminar el envío marítimo:', error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}