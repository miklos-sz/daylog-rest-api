import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

export default {
    development: {
        client: 'mysql',
        connection: {
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: 'seeds'
        },
        timezone: 'UTC'
    },
    production: {
        client: 'mysql',
        connection: {
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: 'migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: 'seeds'
        },
        timezone: 'UTC'
    }
}