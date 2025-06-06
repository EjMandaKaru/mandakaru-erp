"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ImemberList } from "@/interfaces";

export async function updateStatus(formData: FormData) {
  const action = formData.get("action");
  if (action === null) throw new Error("action cannot be null");
  const { id, status } = JSON.parse(action as string);

  await db.update(users).set({ status }).where(eq(users.id, id));
  revalidatePath("/");
}

export async function MemberCard({ lista }: ImemberList) {
  return (
    <div className="container w-max ml-3 h-[80vh] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((membro) => (
          <form
            action={updateStatus}
            key={membro.id}
            className="card w-96 border border-base-300 bg-base-100 shadow-sm"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning">
                Status: {membro.status}
              </span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">{membro.name}</h2>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <span className="text-xl">Cargo: programador</span>
                </li>
                <li>
                  <span>Matricula: {membro.matricula}</span>
                </li>
                <li>
                  <span>Curso: {membro.curso}</span>
                </li>
                <li>
                  <span>Telefone: {membro.telefone}</span>
                </li>
                <li>
                  <span>Email: {membro.email}</span>
                </li>
              </ul>
              <div className="mt-6">
                <button
                  type="submit"
                  name="action"
                  value={JSON.stringify({ id: membro.id, status: "ativo" })}
                  className="btn btn-success btn-block"
                >
                  Confirmar
                </button>
                <button
                  type="submit"
                  name="action"
                  value={JSON.stringify({ id: membro.id, status: "arquivado" })}
                  className="btn btn-error btn-block"
                >
                  Arquivar
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
