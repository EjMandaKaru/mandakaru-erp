"use client";

import {
  activeMember,
  addMemberToQueue,
  arquiveMember,
  deleteMember,
  pendingMember,
} from "@/app/actions";
import { Imember } from "@/interfaces";
import { UserCog, UserPen, UserPlus, UserX, X } from "lucide-react";
import { ReactNode } from "react";
import { z } from "zod";
export const signUpFormSchema = z.object({
  matricula: z.string().min(12),
});

export interface Imodal {
  name: string;
  children: ReactNode;
  className?: string;
}

export function ModalBtn(props: Imodal) {
  return (
    <div>
      <label htmlFor={props.name}>
        <span className="btn btn-ghost text-2xl">{props.children}</span>
      </label>
    </div>
  );
}

export function Modal(props: Imodal) {
  return (
    <div>
      {props.children}
      <ModalBtn name={props.name}>
        <UserPlus />
      </ModalBtn>
      <input type="checkbox" id={props.name} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor={props.name}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X />
          </label>
        </div>
      </div>
    </div>
  );
}

export function AddMemberModal() {
  return (
    <div>
      <label htmlFor="my_modal">
        <span className="btn btn-ghost text-2xl">
          <UserPlus />
        </span>
      </label>
      <input type="checkbox" id="my_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor="my_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X />
          </label>
          <form action={addMemberToQueue}>
            <label htmlFor="matricula" className="block text-lg font-bold mb-2">
              Adicionar membro
            </label>

            <input
              type="text"
              id="matricula"
              name="matricula"
              placeholder="Matícula"
              className="input m-2"
              required
            />
            <button type="submit" className="btn btn-success text-2x m-2">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ModalDetails(props: Imember) {
  return (
    <div>
      <label htmlFor="modal_details">
        <span className="btn btn-ghost">
          <UserCog />
        </span>
      </label>
      <input type="checkbox" id="modal_details" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="controls ">
            <label
              htmlFor="modal_details"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X />
            </label>
          </div>
          <div>
            <h2 className="block text-lg font-bold mb-2">{props.name}</h2>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Status: </span>
              {props.status}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Id: </span>
              {props.id}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Cargo: </span>
              {props.cargo}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Matricula: </span>
              {props.matricula}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Curso: </span>
              {props.curso}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Email: </span>
              {props.email}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Telefone: </span>
              {props.telefone}
            </p>
            <button className="btn btn-success text-2x mt-2 mr-2">
              <UserPen />
              Editar
            </button>
            <form action={arquiveMember} className="inline">
              <button
                value={props.id}
                name="memberID"
                className="btn btn-success text-2x mt-2"
              >
                <UserPen />
                Arquivar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalPendingDetails(props: Imember) {
  return (
    <div>
      <label htmlFor="modal_details">
        <span className="btn btn-ghost">
          <UserCog />
        </span>
      </label>
      <input type="checkbox" id="modal_details" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="controls ">
            <label
              htmlFor="modal_details"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X />
            </label>
          </div>
          <div>
            <h2 className="block text-lg font-bold mb-2">{props.name}</h2>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Status: </span>
              {props.status}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Id: </span>
              {props.id}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Cargo: </span>
              {props.cargo}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Matricula: </span>
              {props.matricula}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Curso: </span>
              {props.curso}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Email: </span>
              {props.email}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Telefone: </span>
              {props.telefone}
            </p>
            <button className="btn btn-success text-2x mt-2 mr-2">
              <UserPen />
              Editar
            </button>
            <form action={activeMember} className="inline">
              <button
                value={props.id}
                name="memberID"
                className="btn btn-success text-2x mt-2 mr-2"
              >
                <UserPen />
                Efetivar
              </button>
            </form>
            <form action={arquiveMember} className="inline">
              <button
                value={props.id}
                name="memberID"
                className="btn btn-success text-2x mt-2"
              >
                <UserPen />
                Arquivar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalArquivedDetails(props: Imember) {
  return (
    <div>
      <label htmlFor="modal_details">
        <span className="btn btn-ghost">
          <UserCog />
        </span>
      </label>
      <input type="checkbox" id="modal_details" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="controls ">
            <label
              htmlFor="modal_details"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X />
            </label>
          </div>
          <div>
            <h2 className="block text-lg font-bold mb-2">{props.name}</h2>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Status: </span>
              {props.status}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Id: </span>
              {props.id}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Cargo: </span>
              {props.cargo}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Matricula: </span>
              {props.matricula}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Curso: </span>
              {props.curso}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Email: </span>
              {props.email}
            </p>
            <p className="block text-white mb-2">
              <span className="text-gray-400">Telefone: </span>
              {props.telefone}
            </p>
            <form action={pendingMember} className="inline">
              <button
                value={props.id}
                name="memberID"
                className="btn btn-success text-2x mt-2 mr-2"
              >
                <UserPen />
                Remover
              </button>
            </form>
            <form action={deleteMember} className="inline">
              <button
                value={props.id}
                name="memberID"
                className="btn btn-error text-2x mt-2"
              >
                <UserX />
                Deletar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
