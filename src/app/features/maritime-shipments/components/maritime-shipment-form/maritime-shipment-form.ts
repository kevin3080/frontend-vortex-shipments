import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import z from 'zod';
import { testPorts, testProducts } from '../../../../shared/constants/mockData';
import { Client, Port, Product } from '../../../../shared/interfaces';
import { dateRangeValidator } from '../../../../shared/utils/date-range-validator';
import { ClientService } from '../../../clients/services/client-service';
import { MaritimeShipmentsService } from '../../services/maritime-shipments-service';
import { MaritimeShipmentCreatePayloadSchema } from '../../../../shared/schemas/maritime-shipments.schema';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-maritime-shipment-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  templateUrl: './maritime-shipment-form.html',
  styleUrl: './maritime-shipment-form.scss'
})
export class MaritimeShipmentForm implements OnInit{

  private formBuilder = inject(NonNullableFormBuilder);
  private dialogRef = inject(MatDialogRef<MaritimeShipmentForm>);
  private maritimeShipmentService = inject(MaritimeShipmentsService);
  private clientService = inject(ClientService);

  public maritimeShipmentForm = this.formBuilder.group({
    clientId: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    portId: ['', [Validators.required]], // Agregado
    originPortId: ['', [Validators.required]],
    destinationPortId: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    registrationDate: [new Date(), [Validators.required]],
    deliveryDate: [new Date(), [Validators.required]],
    shippingCost: [0, [Validators.required, Validators.min(0)]],
    vesselName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    containerNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{4}\d{7}$')]],
    billOfLading: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]*$')]],
    fleetNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^[A-Z0-9]*$')
      ]
    ],
    guideNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]*$')
      ]
    ],
  }, { validators: dateRangeValidator });

  public clients$!: Observable<Client[]>;
  public products$: Observable<Product[]> = of([]);
  public ports$: Observable<Port[]> = of([]);

  ngOnInit(): void {
    this.products$ = of(testProducts);
    this.ports$ = of(testPorts);

    this.clients$ = this.clientService.getClients();
  }

  onSave(): void {
    if (this.maritimeShipmentForm.valid) {
      const formValue = this.maritimeShipmentForm.getRawValue();

      try {
        const payload = MaritimeShipmentCreatePayloadSchema.parse(formValue);

        this.maritimeShipmentService.createMaritimeShipment(payload).subscribe({
          next: (response) => {
            console.log('Envío marítimo creado:', response);
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al crear el envío marítimo:', error);
          }
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Error de validación de Zod:', error.issues);
        } else {
          console.error('Error desconocido:', error);
        }
      }
    }
  }

  uppercaseInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  isInvalid(controlName: string): boolean {
    const control = this.maritimeShipmentForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
