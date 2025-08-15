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

export interface LandShipment {
  id: string;
  client: Client;
  product: Product;
  quantity: number;
  registrationDate: string;
  deliveryDate: string;
  warehouse: Warehouse;
  shippingCost: number;
  discountedCost: number;
  vehiclePlate: string;
  guideNumber: string;
}

export interface LandShipmentCreatePayload {
  clientId: string;
  productId: string;
  quantity: number;
  registrationDate: Date;
  deliveryDate: Date;
  warehouseId: string;
  shippingCost: number;
  vehiclePlate: string;
  guideNumber: string;
}

export interface LandShipmentUpdatePayload extends LandShipmentCreatePayload {
}

export interface LandShipmentForm {
  clientId: FormControl<string>;
  productId: FormControl<string>;
  warehouseId: FormControl<string>;
  quantity: FormControl<number>;
  registrationDate: FormControl<string>;
  deliveryDate: FormControl<string>;
  shippingCost: FormControl<number>;
  vehiclePlate: FormControl<string>;
  guideNumber: FormControl<string>;
}

