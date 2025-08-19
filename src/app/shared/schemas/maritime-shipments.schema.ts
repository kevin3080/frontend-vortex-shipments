import { z } from 'zod';

export const MaritimeShipmentCreatePayloadSchema = z.object({
  clientId: z.string().uuid({ message: "Client ID is required" }),
  productId: z.string().uuid({ message: "Product ID is required" }),
  portId: z.string().uuid({ message: "Port ID is required" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  registrationDate: z.string().pipe(z.coerce.date()).refine(date => !isNaN(date.getTime()), { message: "Registration date is required" }),
  deliveryDate: z.string().pipe(z.coerce.date()).refine(date => !isNaN(date.getTime()), { message: "Delivery date is required" }),
  originPortId: z.string().uuid({ message: "Origin port is required" }),
  destinationPortId: z.string().uuid({ message: "Destination port is required" }),
  shippingCost: z.number().min(0, { message: "Shipping cost cannot be negative" }),
  vesselName: z.string()
    .min(2, { message: "Vessel name is required" })
    .max(100, { message: "Vessel name cannot exceed 100 characters" }),
  containerNumber: z.string()
    .regex(/^[A-Z]{4}\d{7}$/, { message: "Container number must follow ISO 6346 format (e.g., ABCD1234567)" }),
  billOfLading: z.string()
    .min(10, { message: "Bill of Lading must be at least 10 characters" })
    .max(20, { message: "Bill of Lading cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9]*$/, { message: "Bill of Lading must be alphanumeric" }),
  fleetNumber: z.string()
    .min(5, { message: "Fleet number must be at least 5 characters" })
    .max(15, { message: "Fleet number cannot exceed 15 characters" })
    .regex(/^[A-Z0-9]*$/, { message: "Fleet number must be alphanumeric" }),
  guideNumber: z.string()
    .min(10, { message: "Guide number must be at least 10 characters" })
    .max(10, { message: "Guide number cannot exceed 10 characters" })
    .regex(/^[a-zA-Z0-9]*$/, { message: "Guide number must be alphanumeric" }),
});

export type MaritimeShipmentCreatePayload = z.infer<typeof MaritimeShipmentCreatePayloadSchema>;
