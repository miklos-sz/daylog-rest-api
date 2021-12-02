import express from 'express'
import {
    addUser,
    loginUser,
    getToken,
} from '../controllers/users.js'

const router = express.Router()

router.post('/', addUser);
router.post('/login', loginUser)
router.post('/token', getToken)

export default router;
