import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(4, 'El nombre debe tener al menos 4 caracteres.').regex(/^[a-zA-Z\s.-]+$/, 'Solo se permiten letras, espacios, puntos y guiones.'),
  email: z.string().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Ingresa un email válido.'),
   phone: z.string()
    .min(7, 'El teléfono debe tener entre 7 y 15 dígitos.')
    .max(15, 'El teléfono no puede tener más de 15 dígitos.')
    .regex(/^[0-9+-\s]*[0-9]+$/, 'Ingresa un teléfono válido. No puede terminar en guion o espacio.')
});
