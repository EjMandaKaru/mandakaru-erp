// src/app/dashboard/gestao-financeira/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  Building,
  CreditCard,
  FileText,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

const patrimonioSchema = z.object({
  nome: z.string().min(2, "Nome do bem é obrigatório"),
  descricao: z.string().optional(),
});

type PatrimonioForm = z.infer<typeof patrimonioSchema>;

export default function GestaoFinanceiraPage() {
  const [patrimonios, setPatrimonios] = useState<
    { nome: string; descricao?: string }[]
  >([]);

  const patrimonioForm = useForm<PatrimonioForm>({
    resolver: zodResolver(patrimonioSchema),
    defaultValues: { nome: "", descricao: "" },
  });

  function adicionarPatrimonio(data: PatrimonioForm) {
    setPatrimonios((prev) => [...prev, data]);
    patrimonioForm.reset();
  }

  return (
    <div className="overflow-auto container h-[80vh] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center gap-3">
          <Banknote className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl font-bold">Gestão Financeira</h1>
            <p className="text-base-content/70">
              Controle de patrimônio, dados bancários, contas e documentos.
            </p>
          </div>
        </header>

        {/* Controle de Patrimônio */}
        <section className="bg-base-100 p-5 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building size={20} /> Controle de Patrimônio
          </h2>

          <form
            onSubmit={patrimonioForm.handleSubmit(adicionarPatrimonio)}
            className="flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Nome do bem"
              {...patrimonioForm.register("nome")}
              className="input input-bordered flex-1"
            />
            <input
              type="text"
              placeholder="Descrição (opcional)"
              {...patrimonioForm.register("descricao")}
              className="input input-bordered flex-1"
            />
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} /> Adicionar
            </button>
          </form>

          <ul className="list-disc pl-5 space-y-1">
            {patrimonios.map((p, i) => (
              <li key={i}>
                <strong>{p.nome}</strong>
                {p.descricao && ` — ${p.descricao}`}
              </li>
            ))}
          </ul>
        </section>

        {/* Informações Bancárias */}
        <section className="bg-base-100 p-5 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CreditCard size={20} /> Informações Bancárias
          </h2>
          <form className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Banco"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Agência"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Conta"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Senha / Token (restrito)"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary col-span-full">
              <PlusCircle size={18} /> Salvar Dados
            </button>
          </form>
        </section>

        {/* Contas a Pagar e a Receber */}
        <section className="bg-base-100 p-5 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Banknote size={20} /> Contas a Pagar e a Receber
          </h2>
          <form className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Descrição"
              className="input input-bordered"
            />
            <input
              type="number"
              placeholder="Valor"
              className="input input-bordered"
            />
            <input type="date" className="input input-bordered" />
            <select className="select select-bordered md:col-span-3">
              <option>Tipo de Lançamento</option>
              <option>Pagar</option>
              <option>Receber</option>
            </select>
            <button type="submit" className="btn btn-primary col-span-full">
              <PlusCircle size={18} /> Adicionar Lançamento
            </button>
          </form>
        </section>

        {/* Notas Fiscais e Recibos */}
        <section className="bg-base-100 p-5 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText size={20} /> Notas Fiscais e Recibos
          </h2>
          <form className="flex flex-col md:flex-row gap-3">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} /> Enviar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
