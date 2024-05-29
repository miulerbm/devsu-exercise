import { z } from "zod";

export const formSchema = z.object({
  id: z
    .string({ required_error: "ID no válido!" })
    .min(3, { message: "El ID debe tener al menos 3 caracteres" })
    .max(10, { message: "El ID no puede tener más de 10 caracteres" }),

  name: z
    .string({ required_error: "Este campo es requerido!" })
    .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),

  description: z
    .string({ required_error: "Este campo es requerido!" })
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(200, {
      message: "La descripción no puede tener más de 200 caracteres",
    }),

  logo: z
    .string({ required_error: "Este campo es requerido!" })
    .min(1, { message: "Se requiere un logo" }),

  date_release: z
    .date({ required_error: "Debe seleccionar una fecha" })
    .min(new Date("1900-01-01"), "La fecha de liberación no es válida"),

  date_revision: z
    .date({ required_error: "Debe seleccionar una fecha" })
    .min(new Date("1900-01-01"), "La fecha de liberación no es válida"),

  // .max(new Date(), "La fecha de liberación no puede estar en el futuro"),

  // fechaRevision: z.date(),
});
