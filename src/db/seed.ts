import { users } from "./schema";
import { db } from ".";
import data from "./members";

async function insert() {
  for (const member of data) {
    console.log("Adicionado " + member.name + " com cargo: " + member.cargo);
    await db.insert(users).values({
      name: member.name,
      cargo: String(member.cargo),
      matricula: member.matricula,
      curso: member.curso,
      telefone: member.telefone,
      email: member.email,
      status: member.status,
    });
  }
}

insert();
