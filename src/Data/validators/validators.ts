import { z } from "zod";

export const formSchema = z.object({
  id: z
    .string({ required_error: "ID no válido!" })
    .min(3, { message: "El ID debe tener al menos 3 caracteres" })
    .max(10, { message: "El ID no puede tener más de 10 caracteres" })
    .refine((value) => value.trim().length >= 3, {
      message: "El ID no puede estar vacío",
    }),

  name: z
    .string({ required_error: "Este campo es requerido!" })
    .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres" })
    .refine((value) => value.trim().length >= 5, {
      message: "El nombre no puede estar vacío",
    }),

  description: z
    .string({ required_error: "Este campo es requerido!" })
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(200, {
      message: "La descripción no puede tener más de 200 caracteres",
    })
    .refine((value) => value.trim().length >= 10, {
      message: "La descripción no puede estar vacía",
    }),

  logo: z
    .string({ required_error: "Este campo es requerido!" })
    .min(1, { message: "Se requiere un logo" })
    .refine((value) => value.trim().length >= 1, {
      message: "El logo no puede estar vacío",
    }),

  date_release: z
    .date({ required_error: "Debe seleccionar una fecha" })
    .refine((date) => date > new Date(), {
      message: "La fecha de liberación debe ser mayor a la fecha de hoy",
    }),

  date_revision: z.date({ required_error: "Debe seleccionar una fecha" }),
});
