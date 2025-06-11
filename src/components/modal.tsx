"use client";

import { UserPen, UserX, X } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { z } from "zod";
export const signUpFormSchema = z.object({
  matricula: z.string().min(12),
});

export interface Imodal {
  name: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export type ImodalBtn = {
  id: string | undefined;
  className?: string;
};

export function Modal(props: Imodal) {
  return (
    <div>
      <label htmlFor={props.name} className="cursor-pointer">
        <span className="btn btn-ghost text-2xl">{props.trigger}</span>
      </label>
      <input type="checkbox" id={props.name} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor={props.name}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X />
          </label>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export function EditBtn(props: ImodalBtn) {
  return (
    <Link
      href={`/dashboard/membros/editar/${props.id}`}
      className="btn btn-success text-2x mt-2 mr-2"
    >
      <UserPen />
      Editar
    </Link>
  );
}

export function ActiveBtn(props: ImodalBtn) {
  return (
    <button
      value={props.id}
      name="memberID"
      className="btn btn-success text-2x mt-2 mr-2"
    >
      <UserPen />
      Efetivar
    </button>
  );
}

export function RemoveBtn(props: ImodalBtn) {
  return (
    <button
      value={props.id}
      name="memberID"
      className="btn btn-success text-2x mt-2 mr-2"
    >
      <UserPen />
      Remover
    </button>
  );
}

export function ArquiveBtn(props: ImodalBtn) {
  return (
    <button
      value={props.id}
      name="memberID"
      className="btn btn-success text-2x mt-2"
    >
      <UserPen />
      Arquivar
    </button>
  );
}

export function DeleteBtn(props: ImodalBtn) {
  return (
    <button
      value={props.id}
      name="memberID"
      className="btn btn-error text-2x mt-2"
    >
      <UserX />
      Deletar
    </button>
  );
}
