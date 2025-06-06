import { pgTable, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable("membros", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  matricula: varchar({ length: 255 }).notNull().unique(),
  cargo: varchar({ length: 255 }).notNull(),
  curso: varchar({ length: 255 }).notNull(),
  telefone: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  status: varchar({ length: 255 }).notNull(),
});

export const listaDeEspera = pgTable("listaDeEspera", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  matricula: varchar({ length: 255 }).notNull().unique(),
  status: varchar({ length: 255 }).notNull(),
});
