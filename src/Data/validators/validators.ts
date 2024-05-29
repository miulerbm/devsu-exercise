import { z } from "zod";

export const formSchema = z.object({
  id: z
    .string()
    .min(3, { message: "El ID debe tener al menos 3 caracteres" })
    .max(10, { message: "El ID no puede tener más de 10 caracteres" }),

  nombre: z
    .string()
    .min(5, { message: "El nombre debe tener al menos 5 caracteres" })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres" }),

  descripcion: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(200, {
      message: "La descripción no puede tener más de 200 caracteres",
    }),

  logo: z.string().min(1, { message: "Se requiere un logo" }),

  fechaLiberacion: z.date(),

  fechaRevision: z.date(),
});
