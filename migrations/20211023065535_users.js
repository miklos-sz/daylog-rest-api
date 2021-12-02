const TABLE_NAME = 'users'

export function up(knex, Promise) {
    return knex.schema
    .createTable(TABLE_NAME, (table) => {
        table.string('email').notNullable().primary()
        table.string('username', 256).notNullable()
        table.string('first_name', 256).notNullable()
        table.string('last_name', 256).notNullable()
        table.string('password').notNullable()
        table.text('refresh_token')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('logged_in_at')
        table.string('logged_in_ip')
    })
};

export function down(knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME);
}

