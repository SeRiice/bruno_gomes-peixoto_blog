export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("comments").del()
  await knex("posts").del()
  await knex("users").del()
  await knex("roles").del()

  // Inserts seed entries
  await knex("roles").insert([
    { name: "ADMIN" },
    { name: "AUTHOR" },
    { name: "USER" },
  ])
}
