import { string, z } from "zod/v4";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const memberSchema = z.object({
  id: string().optional(),
  name: z
    .string()
    .min(3, {
      message: "O nome deve conter no mínimo 3 e no máximo 100 caractéres!",
    })
    .max(100, { message: "Deve conter menos de 100 caractéres!" }),
  matricula: z
    .string()
    .min(12, { message: "matricula deve conter no mínimo 12 caracteres!" })
    .max(12, "Deve conter no máximo 12 caractéres!"),
  curso: z.string().nonempty("Campo obrigatório!"),
  telefone: z
    .string()
    .min(9, { message: "O número deve conter no mínimo 9 dígitos!" })
    .max(15, { message: "O número deve conter no máximo 15 dígitos!" })
    .regex(phoneRegex, "Formato de número inválido"),

  email: z
    .email({ message: "Formato de Email Inválido." })
    .nonempty("Campo obrigatório"),
  cargo: z.string(),
  status: z.string(),
});

export type MemberSchema = z.infer<typeof memberSchema>;
