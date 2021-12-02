import { updateUser, getUserByRefreshToken } from '../repositories/usersRepository.js'
import jwt from 'jsonwebtoken'

const getPayloadFromUserdata = (userData) => {
    // this way we separate the password and the refresh token from the rest of the user data
    // the password will contain the password, the payload will have the rest
    const { password, refresh_token, ...payload } = userData

    return payload
}

export const verifyAccessToken = (accessToken) => {
    const tokenPayload = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
    )

    return tokenPayload
}

export const verifyRefreshToken = (refreshToken) => {
    const tokenPayload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
    )

    return !!tokenPayload
}

export const createAccessToken = (userData) => {
    return jwt.sign(
        getPayloadFromUserdata(userData),
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION },
    )
}

export const createRefreshToken = async (userData) => {
    const refreshToken = jwt.sign(
        getPayloadFromUserdata(userData),
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION }
    )

    await updateUser(userData.email, { refresh_token: refreshToken })

    return refreshToken
}

export const removeRefreshToken = async (email) => {
    await updateUser(email, { refresh_token: null })
}
