import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export default async function dashboard() {
  const { userId } = await auth();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, String(userId)));
  console.log(user);
  // if (user.length === 0) return <div>Acesso negado!</div>;
  if (!userId) throw new Error("User not found");
  return(
    <div>Dashboard page</div>
  )

}
