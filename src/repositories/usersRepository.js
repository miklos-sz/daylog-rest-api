import { db } from '../app/db.js'

const TABLE_NAME = 'users'

export const getUserByEmail = async (email) => {
    return await db(TABLE_NAME).where({ email }).first()
}

export const getUserByRefreshToken = async (refresh_token) => {
    return await db(TABLE_NAME).where({ refresh_token }).first()
}

export const insertUser = async (userData) => {
    await db(TABLE_NAME)
        .insert(userData)

    return userData
}

export const updateUser = async (email, userData) => {
    await db(TABLE_NAME)
        .where({ email })
        .update( userData )
    return getUserByEmail(email)
}
