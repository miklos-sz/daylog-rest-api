import httpStatusCodes from 'http-status-codes'
import { verifyAccessToken } from '../app/auth.js'
import { getUserByEmail } from '../repositories/usersRepository.js'

const getTokenFromRequest = (req) => {
    return req.headers.authorization.split(' ')[1];
}

export const jwtAccesTokenAuth = async (req, res, next) => {
    try {
        const token = getTokenFromRequest(req)
        
        const tokenPayload = await verifyAccessToken(token)
    
        if (tokenPayload) {
            const user = await getUserByEmail(tokenPayload.email);
            if (!user) {
                return res.status(httpStatusCodes.UNAUTHORIZED).json({ data: null, error: 'Not authorized' })
            }
            req.user = user
            console.log('dayum!')
            next()
        } else {
            res.status(httpStatusCodes.UNAUTHORIZED).json({ data: null, error: 'Not authorized' })
        }
    } catch (error) {
        console.log(error)
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, error })
    }
}
