"use client";

import { Input, Button, File } from "@/components/form";
import { addMember } from "@/app/actions";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
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
});

type FormData = z.infer<typeof schema>;

async function onSubmit(data: FormData) {
  try {
    await addMember({
      ...data,
      cargo: "Não Atribuído",
      status: "pendente",
    });

    alert("Cadastro realizado com sucesso!");
  } catch (err) {
    alert("Erro ao enviar formulário.");
    console.error(err);
  }
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  console.log(errors);
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-auto max-h-full max-w-sm lg:min-w-200 mt-5 mx-auto border-base-300 rounded-box w-xs border shadow-2xl p-4"
      >
        <h1>Completar cadastro</h1>
        <Input
          label="Nome completo"
          id="nome"
          placeholder="Exemplo: fulano da silva souza"
          {...register("name")}
          errors={errors.name?.message}
        />

        <Input
          label="Matricula"
          id="matricula"
          placeholder="Exemplo: 202511120025"
          {...register("matricula")}
          errors={errors.matricula?.message}
        />
        <Input
          label="Curso"
          id="curso"
          placeholder="Exemplo: Ciências biológicas"
          {...register("curso")}
          errors={errors.curso?.message}
        />
        <Input
          label="Telefone"
          id="telefone"
          placeholder="Exemplo: (DDD) 9999-9999"
          {...register("telefone")}
          errors={errors.telefone?.message}
        />
        <Input
          label="Email"
          id="email"
          placeholder="Exemplo: fulanodasilva@gmail.com"
          {...register("email")}
          errors={errors.email?.message}
        />
        <File
          id="termo"
          label="Termo de compromisso"
          placeholder="Máximo 10MB"
        ></File>
        <Button className="w-full">Enviar</Button>
      </form>
    </div>
  );
}
