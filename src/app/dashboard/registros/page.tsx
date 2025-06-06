import { MemberCard } from "@/components/memberCard";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Registro() {
  const lista = await db
    .select()
    .from(users)
    .where(eq(users.status, "pendente"));
  return <MemberCard lista={lista}></MemberCard>;
}
