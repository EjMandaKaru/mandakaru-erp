"use server";
import { db } from "@/db";
import { listaDeEspera, users } from "@/db/schema";
import { Imember } from "@/interfaces";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { memberSchema } from "@/validations/member";
import { ActionResponse } from "@/types";

export async function addMember(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  "use server";
  try {
    const rawData: Imember = {
      name: String(formData.get("name")),
      cargo: "Não Atribuído",
      matricula: String(formData.get("matricula")),
      curso: String(formData.get("curso")),
      telefone: String(formData.get("telefone")),
      email: String(formData.get("email")),
      status: "pendente",
    };

    const userData = memberSchema.safeParse(rawData);
    if (!userData.success) {
      return {
        success: false,
        message: "",
        errors: userData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    await db.insert(users).values({
      name: userData.data.name,
      cargo: String(userData.data.cargo),
      matricula: userData.data.matricula,
      curso: userData.data.curso,
      telefone: userData.data.telefone,
      email: userData.data.email,
      status: userData.data.status,
    });
    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error ocurred",
    };
  }
}

export async function updateMember(data: Imember) {
  "use server";

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
