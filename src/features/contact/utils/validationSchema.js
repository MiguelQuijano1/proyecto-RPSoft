// src/features/contact/utils/validationSchema.js
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  email: z.string()
    .email('Debe ser un email válido')
    .min(1, 'El email es requerido'),
  
  subject: z.string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres'),
  
  budget: z.string()
    .optional()
    .transform(val => val === '' ? undefined : val),
  
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política de privacidad' })
  })
});