import { z } from 'zod';
import { clientSchema } from '../schemas/client-schema';
import { FormControl } from '@angular/forms';

export type Client = z.infer<typeof clientSchema>;

export interface Product {
  id: string;
  name: string;
  description: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface Port {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface BaseShipment {
  id: string;
  client: Client;
  product: Product;
  quantity: number;
  registrationDate: string;
  deliveryDate: string;
  shippingCost: number;
  discountedCost: number;
}

export interface LandShipment extends BaseShipment {
  warehouse: Warehouse;
  vehiclePlate: string;
  guideNumber: string;
}

export interface MaritimeShipment extends BaseShipment {
  originPort: Port;
  destinationPort: Port;
  vesselName: string;
  containerNumber: string;
  billOfLading: string;
}

export interface BaseShipmentCreatePayload {
  clientId: string;
  productId: string;
  quantity: number;
  registrationDate: Date;
  deliveryDate: Date;
  shippingCost: number;
  guideNumber: string;
}

export interface LandShipmentCreatePayload extends BaseShipmentCreatePayload {
  warehouseId: string;
  vehiclePlate: string;
}

export interface MaritimeShipmentCreatePayload extends BaseShipmentCreatePayload {
  portId: string;
  fleetNumber: string;
}

export interface MaritimeShipmentUpdatePayload extends MaritimeShipmentCreatePayload {
  
}

export interface LandShipmentUpdatePayload extends LandShipmentCreatePayload {
}

export interface BaseShipmentForm {
  clientId: FormControl<string>;
  productId: FormControl<string>;
  quantity: FormControl<number>;
  registrationDate: FormControl<Date>;
  deliveryDate: FormControl<string>;
  shippingCost: FormControl<number>;
  guideNumber: FormControl<string>;
}

export interface LandShipmentForm extends BaseShipmentForm {
  warehouseId: FormControl<string>;
  vehiclePlate: FormControl<string>;
}

export interface MaritimeShipmentForm extends BaseShipmentForm {
  portId: FormControl<string>;
  fleetNumber: FormControl<string>;
}

