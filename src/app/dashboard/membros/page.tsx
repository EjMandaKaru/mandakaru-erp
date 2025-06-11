import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  ArquivedTableSection,
  MemberTableSection,
  PendingTableSection,
} from "@/components/table";
// import Image from "next/image";

export default async function Membros() {
  "use server";
  const membrosEfetivos = await db
    .select()
    .from(users)
    .where(eq(users.status, "ativo"));

  const registrosPendentes = await db
    .select()
    .from(users)
    .where(eq(users.status, "pendente"));
  const registrosArquivados = await db
    .select()
    .from(users)
    .where(eq(users.status, "arquivado"));
  return (
    <div className="overflow-auto container ml-3 h-[80vh]">
      <MemberTableSection members={membrosEfetivos} title="Membros Efetivos" />
      <PendingTableSection
        members={registrosPendentes}
        title="Membros Pendentes"
      />
      <ArquivedTableSection
        members={registrosArquivados}
        title="Membros arquivados"
      />
    </div>
  );
}
