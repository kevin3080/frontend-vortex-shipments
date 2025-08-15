import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LandShipmentService } from '../../services/land-shipment-service';
import { ClientService } from '../../../clients/services/client-service';
import { Client, Product, Warehouse } from '../../../../shared/interfaces';
import { Observable, of } from 'rxjs';
import { testProducts, testWarehouses } from '../../../../shared/constants/mockData';
import { dateRangeValidator } from '../../../../shared/utils/date-range-validator';
import z from 'zod';
import { LandShipmentCreatePayloadSchema } from '../../../../shared/schemas/land-shipment.schema';

@Component({
  selector: 'app-land-shipment-form',
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
  templateUrl: './land-shipment-form.html',
  styleUrl: './land-shipment-form.scss'
})
export class LandShipmentForm implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private dialogRef = inject(MatDialogRef<LandShipmentForm>);
  private landShipmentService = inject(LandShipmentService);
  private clientService = inject(ClientService);

  public landShipmentForm = this.formBuilder.group({
    clientId: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    warehouseId: ['', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    registrationDate: [new Date(), [Validators.required]],
    deliveryDate: [new Date(), [Validators.required]],
    shippingCost: [0, [Validators.required, Validators.min(0)]],
    vehiclePlate: [
      '',
      [
        Validators.required,
        Validators.pattern('^[A-Z]{3}\\d{3}$')
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
  public warehouses$: Observable<Warehouse[]> = of([]);

  ngOnInit(): void {
    this.products$ = of(testProducts);
    this.warehouses$ = of(testWarehouses);

    this.clients$ = this.clientService.getClients();
  }

   onSave(): void {
    if (this.landShipmentForm.valid) {
      const formValue = this.landShipmentForm.getRawValue();

      try {
        const payload = LandShipmentCreatePayloadSchema.parse(formValue);

        this.landShipmentService.createLandShipment(payload).subscribe({
          next: (response) => {
            console.log('Envío terrestre creado:', response);
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al crear el envío terrestre:', error);
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

  isInvalidControl(controlName: keyof typeof this.landShipmentForm.controls): boolean {
    const control = this.landShipmentForm.controls[controlName] as AbstractControl;
    return control.invalid && (control.dirty || control.touched);
  }

  isInvalid(controlName: string): boolean {
    const control = this.landShipmentForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
