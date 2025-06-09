"use client";

import { Input, Button, File } from "@/components/form";
import { addMember } from "@/app/actions";
import { useActionState } from "react";
import { ActionResponse } from "@/types";

const initialState = {
  success: false,
  message: "",
  errors: {},
};
export default function Register() {
  const [state, action, isPending] = useActionState<ActionResponse, FormData>(
    addMember,
    initialState
  );
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        action={action}
        className="overflow-auto max-h-full max-w-sm lg:min-w-200 mt-5 mx-auto border-base-300 rounded-box w-xs border shadow-2xl p-4"
      >
        <h1>Completar cadastro</h1>
        <Input
          label="Nome completo"
          id="name"
          placeholder="Exemplo: fulano da silva souza"
          errors={state.errors?.name?.[0]}
        />

        <Input
          label="Matricula"
          id="matricula"
          placeholder="Exemplo: 202511120025"
          errors={state.errors?.matricula?.[0]}
        />
        <Input
          label="Curso"
          id="curso"
          placeholder="Exemplo: Ciências biológicas"
          errors={state.errors?.curso?.[0]}
        />
        <Input
          label="Telefone"
          id="telefone"
          placeholder="Exemplo: (DDD) 9999-9999"
          errors={state.errors?.telefone?.[0]}
        />
        <Input
          label="Email"
          id="email"
          placeholder="Exemplo: fulanodasilva@gmail.com"
          errors={state.errors?.email?.[0]}
        />
        <File
          id="termo"
          label="Termo de compromisso"
          placeholder="Máximo 10MB"
        ></File>
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
