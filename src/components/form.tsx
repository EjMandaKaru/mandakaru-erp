"use client";

import { updateMember } from "@/app/actions";
import { IformInput, IformBtn, Imember } from "@/interfaces";
import { ActionResponse, Member } from "@/types";
import { useActionState } from "react";

export function Input({
  label,
  id,
  className = "",
  placeholder,
  errors,
  defaultValue,
  ...rest
}: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={id} className="fildset-legend mt-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={className + " input mt-2 w-full"}
        placeholder={placeholder}
        // required
        {...rest}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </fieldset>
  );
}

export function Date({
  label,
  id,
  className = "",
  placeholder,
  errors,
  defaultValue,
  ...rest
}: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={id} className="fildset-legend mt-2">
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={className + " input mt-2 w-full"}
        placeholder={placeholder}
        // required
        {...rest}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </fieldset>
  );
}

export function TextArea({
  label,
  id,
  className = "",
  placeholder,
  errors,
  defaultValue,
  ...rest
}: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={id} className="fildset-legend mt-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={className + " textarea mb-2 mt-2 w-full"}
        placeholder={placeholder}
        // required
        {...rest}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </fieldset>
  );
}

export function File(props: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={props.id} className="fieldset-legend">
        {props.label}
      </label>
      <input
        type="file"
        id={props.id}
        name={props.id}
        className="file-input"
        // required
      />
      <label className="label mb-2">{props.placeholder}</label>
    </fieldset>
  );
}

export function Button(props: IformBtn) {
  return (
    <button className={props.className + " btn btn-outline"}>
      {props.children}
    </button>
  );
}

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export function EditarUsuário({ member }: { member: Imember }) {
  const [state, action, isPending] = useActionState<ActionResponse, FormData>(
    updateMember,
    initialState
  );
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        action={action}
        className="overflow-auto max-h-full max-w-sm lg:min-w-200 mt-5 mx-auto border-base-300 rounded-box w-xs border shadow-2xl p-4"
      >
        <h1>Completar cadastro</h1>
        <input type="hidden" name="id" value={member.id} />
        <Input
          label="Nome completo"
          id="name"
          defaultValue={member.name}
          placeholder="Exemplo: fulano da silva souza"
          errors={state.errors?.name?.[0]}
        />

        <Input
          label="Cargo"
          id="cargo"
          defaultValue={member.cargo}
          placeholder="Exemplo:"
          errors={state.errors?.name?.[0]}
        />

        <Input
          label="Matricula"
          id="matricula"
          defaultValue={member.matricula}
          placeholder="Exemplo: 202511120025"
          errors={state.errors?.matricula?.[0]}
        />

        <Input
          label="Curso"
          id="curso"
          defaultValue={member.curso}
          placeholder="Exemplo: Ciências biológicas"
          errors={state.errors?.curso?.[0]}
        />
        <Input
          label="Telefone"
          id="telefone"
          defaultValue={member.telefone}
          placeholder="Exemplo: (DDD) 9999-9999"
          errors={state.errors?.telefone?.[0]}
        />
        <Input
          label="Email"
          id="email"
          defaultValue={member.email}
          placeholder="Exemplo: fulanodasilva@gmail.com"
          errors={state.errors?.email?.[0]}
        />
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}

export function DesligarUsuario(member: Member) {
  const [state, action, isPending] = useActionState<ActionResponse, FormData>(
    updateMember,
    initialState
  );
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        action={action}
        className="overflow-auto max-h-full max-w-sm lg:min-w-200 mt-5 mx-auto border-base-300 rounded-box w-xs border shadow-2xl p-4"
      >
        <h1>Desligar Membro</h1>
        <h2>{member.name}</h2>
        <input type="hidden" name="id" value={member.id} />
        <Date
          label="Telefone"
          id="telefone"
          defaultValue=""
          errors={state.errors?.telefone?.[0]}
        ></Date>
        <TextArea
          label="Motivo"
          id="reason"
          placeholder=""
          errors={state.errors?.name?.[0]}
        />
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
