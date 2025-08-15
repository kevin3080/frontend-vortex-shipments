import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Observable } from 'rxjs';
import { LandShipmentService } from '../../services/land-shipment-service';
import { MatDialog } from '@angular/material/dialog';
import { LandShipmentForm } from '../land-shipment-form/land-shipment-form';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-land-shipment',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './land-shipment.html',
  styleUrl: './land-shipment.scss'
})
export class LandShipment implements OnInit, OnDestroy{
  private landShipmentService = inject(LandShipmentService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  public landShipments$: Observable<LandShipment[]> | undefined;
  public displayedColumns: string[] = ['client', 'product', 'warehouse', 'quantity', 'shippingCost', 'vehiclePlate', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.landShipments$ = this.landShipmentService.getLandShipments();
  }

   // Función para abrir el modal del formulario
  onNewShipment(): void {
    const dialogRef = this.dialog.open(LandShipmentForm, {
      width: '600px', 
      disableClose: true, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onEdit(landShipment: LandShipment): void {
    console.log('Editar envío:', landShipment);
    // TODO: Implementar la lógica para abrir el formulario de edición.
  }

  private confirmAndExecute(action: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        action();
      }
    });
  }

  onDelete(landShipmentId: string): void {
  this.confirmAndExecute(() => {
    this.landShipmentService.deleteLandShipment(landShipmentId).subscribe({
      next: () => {
        this.fetchData();
      },
      error: (error) => {
        console.error('Error al eliminar el envío:', error);
      }
    });
  });
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
