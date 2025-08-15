import { z } from 'zod';

export const LandShipmentCreatePayloadSchema = z.object({
  clientId: z.string().uuid({ message: "Client ID is required" }),
  productId: z.string().uuid({ message: "Product ID is required" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  registrationDate: z.string().pipe(z.coerce.date()).refine(date => !isNaN(date.getTime()), { message: "Registration date is required" }), // Convierte a Date
  deliveryDate: z.string().pipe(z.coerce.date()).refine(date => !isNaN(date.getTime()), { message: "Delivery date is required" }), // Convierte a Date
  warehouseId: z.string().uuid({ message: "Warehouse ID is required" }),
  shippingCost: z.number().min(0, { message: "Shipping cost cannot be negative" }),
  vehiclePlate: z.string()
    .min(1, { message: "Vehicle plate is required" })
    .regex(/[A-Z]{3}\d{3}/, { message: "Vehicle plate must be 3 initial letters and 3 numbers (e.g., ABC123)" }),
  guideNumber: z.string()
    .min(10, { message: "Guide number must be 10 characters" })
    .max(10, { message: "Guide number must be 10 characters" })
    .regex(/^[a-zA-Z0-9]*$/, { message: "Guide number must be 10 alphanumeric characters" }),
});

export type LandShipmentCreatePayload = z.infer<typeof LandShipmentCreatePayloadSchema>;
