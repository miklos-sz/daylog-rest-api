import bcrypt from 'bcrypt';
import httpStatusCodes from 'http-status-codes'
import { getUserByEmail, getUserByRefreshToken, insertUser } from '../repositories/usersRepository.js'
import { createAccessToken, createRefreshToken, removeRefreshToken, verifyRefreshToken } from '../app/auth.js';

export const addUser = async (req, res) => {
    const {
        username,
        first_name,
        last_name,
        email,
        password
    } = req.body

    if (!username
        || !first_name
        || !last_name
        || !email
        || !password
    ) {
        return res
            .status(httpStatusCodes.BAD_REQUEST)
            .send({ data: null, error: 'Incomplete registration data' })
    }

    try {
        if (await getUserByEmail(email)) {
            return res.status(httpStatusCodes.BAD_REQUEST)
                .send({ data: null, error: `User with email (${email}) already exists` })
        }
        
        const responseUserData = await insertUser({
            username,
            first_name,
            last_name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        delete(responseUserData.password)

        res.status(httpStatusCodes.OK).send({ data: responseUserData, error: null })
    } catch (error) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: null, error: error.message })
    }
}

export const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res
            .status(httpStatusCodes.BAD_REQUEST)
            .send({ data: null, error: 'Incomplete login data' })
    }

    try {
        const userData = await getUserByEmail(email)
    
        if (!userData || !await bcrypt.compare(password, userData.password)) {
            return res
                .status(httpStatusCodes.UNAUTHORIZED)
                .send({ data: null, error: 'Incorrect email address or password' })
        }
    
        const [accessToken, refreshToken] = await Promise.all([
            createAccessToken(userData),
            createRefreshToken(userData)
        ])
    
        res.status(httpStatusCodes.OK).send({ data: {accessToken, refreshToken}, error: null } )
    } catch (error) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: null, error: error.message })
    }
}

export const logoutUser = async (req, res) => {
    try {
        await removeRefreshToken(req.user.email)
        res.status(httpStatusCodes.OK).send({ data: null, error: null })
    } catch (error) {
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: null, error: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const responseUserData = await updateUser(req.user.email, req.body)
        delete(responseUserData.password)
        res.status(httpStatusCodes.OK).send({ data: responseUserData, error: null })
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: null, error: error.message })
    }
}

export const getToken = async (req, res) => {
    const { refresh_token } = req.body

    if (!refresh_token) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({ data: null, error: 'Refresh token missing' })
    }

    try {
        if (!await verifyRefreshToken(refresh_token)) {
            return res.status(httpStatusCodes.UNAUTHORIZED).send({ data: null, error: 'Invalid refresh token' })
        }
        const userData = await getUserByRefreshToken(refresh_token)

        if (!userData) {
            return res.status(httpStatusCodes.UNAUTHORIZED).send({ data: null, error: 'Invalid refresh token' })
        }

        res.status(httpStatusCodes.OK).send({ data: { accessToken: await createAccessToken(userData) } , error: null })
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ data: null, error: error.message })
    }
}

