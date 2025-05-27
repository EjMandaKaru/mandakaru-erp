import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("membros", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  // altura: integer().notNull(),
  // teste: integer().notNull(),
});
