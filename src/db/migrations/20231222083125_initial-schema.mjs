export const up = async (db) => {
  await db.schema.createTable("roles", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").unique().notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.integer("roleId").notNullable().references("id").inTable("roles")
    table.boolean("disabled").defaultTo(false)
    table.timestamps(true, true, true)
  })
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable().references("id").inTable("users")
    table.timestamps(true, true, true)
  })
  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.integer("userId").notNullable().references("id").inTable("users")
    table.integer("postId").notNullable().references("id").inTable("posts")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
  await db.schema.dropTable("posts")
  await db.schema.dropTable("users")
  await db.schema.dropTable("roles")
}
