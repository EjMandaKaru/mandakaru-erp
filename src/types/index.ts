import { Imember } from "@/interfaces";

export type Member = {
  id?: string;
  name?: string;
  cargo?: string;
  matricula?: string;
  curso?: string;
  telefone?: string;
  email?: string;
  status?: string;
};

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof Imember]?: string[];
  };
  inputs?: Partial<Imember>;
}
