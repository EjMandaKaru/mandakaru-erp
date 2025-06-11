import { ReactNode } from "react";
import { Member } from "@/types";

export interface Imember extends Member {
  id?: string;
  name: string;
  cargo?: string;
  matricula: string;
  curso: string;
  telefone: string;
  email: string;
  status: string;
}

export interface ImemberList {
  lista: Imember[];
}

export interface ImemberTable {
  children: ReactNode;
  className?: string;
  title: string;
}

export interface ImemberRow extends Member {
  name: string;
  cargo: string;
  matricula: string;
  status: string;
}

export interface InavLink {
  href: string;
  children: ReactNode;
  className?: string;
}

export interface IdropdownBtn {
  children: ReactNode;
  className?: string;
}

export interface InavList {
  children: ReactNode;
  className?: string;
}

export interface IformInput {
  label: string;
  id: string;
  defaultValue?: string;
  errors?: string;
  placeholder?: string;
  className?: string;
}

export interface IformBtn {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}
