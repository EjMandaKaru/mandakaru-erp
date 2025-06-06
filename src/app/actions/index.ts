"use server";
import { db } from "@/db";
import { listaDeEspera, users } from "@/db/schema";
import { Imember } from "@/interfaces";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addMember(formData: FormData) {
  "use server";
  const data: Imember = {
    name: String(formData.get("nome")),
    cargo: "Não Atribuído",
    matricula: String(formData.get("matricula")),
    curso: String(formData.get("curso")),
    telefone: String(formData.get("telefone")),
    email: String(formData.get("email")),
    status: "pendente",
  };

  await db.insert(users).values({
    name: data.name,
    cargo: String(data.cargo),
    matricula: data.matricula,
    curso: data.curso,
    telefone: data.telefone,
    email: data.email,
    status: data.status,
  });
}

export async function updateMember(formData: FormData) {
  "use server";
  const data: Imember = {
    name: String(formData.get("nome")),
    cargo: "Não Atribuído",
    matricula: String(formData.get("matricula")),
    curso: String(formData.get("curso")),
    telefone: String(formData.get("telefone")),
    email: String(formData.get("email")),
    status: "pendente",
  };

  await db.insert(users).values({
    name: data.name,
    cargo: String(data.cargo),
    matricula: data.matricula,
    curso: data.curso,
    telefone: data.telefone,
    email: data.email,
    status: data.status,
  });
}

export async function addMemberToQueue(formData: FormData) {
  const matricula = String(formData.get("matricula"));
  console.log(matricula);
  await db
    .insert(listaDeEspera)
    .values({ matricula: matricula, status: "pendente" });
  revalidatePath("/");
}

export async function arquiveMember(formData: FormData) {
  const id = String(formData.get("memberID"));
  console.log(id);
  await db.update(users).set({ status: "arquivado" }).where(eq(users.id, id));
  revalidatePath("/");
}

export async function activeMember(formData: FormData) {
  const id = String(formData.get("memberID"));
  console.log(id);
  await db.update(users).set({ status: "ativo" }).where(eq(users.id, id));
  revalidatePath("/");
}

export async function pendingMember(formData: FormData) {
  const id = String(formData.get("memberID"));
  console.log(id);
  await db.update(users).set({ status: "pendente" }).where(eq(users.id, id));
  revalidatePath("/");
}

export async function deleteMember(formData: FormData) {
  const id = String(formData.get("memberID"));
  console.log(id);
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");
}
