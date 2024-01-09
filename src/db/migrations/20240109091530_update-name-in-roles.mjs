export const up = async (db) => {
  await db.schema.alterTable("roles", (table) => {
    table
      .text("name")
      .checkIn(["USER", "AUTHOR", "ADMIN"], "check_roles")
      .unique()
      .notNullable()
      .alter()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("roles", (table) => {
    table.dropUnique("name")
    table.dropChecks("check_roles")
    table.text("name").notNullable().alter()
  })
}
