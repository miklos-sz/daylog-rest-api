const TABLE_NAME = 'logs'

export function up(knex, Promise) {
    return knex.schema
    .createTable(TABLE_NAME, (table) => {
        table.increments('id').primary()
        table.string('title')
        table.text('content')
        table.string('meta')
        table.timestamp('datetime').notNullable().defaultTo(knex.fn.now())
    })
}

export function down(knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
}
