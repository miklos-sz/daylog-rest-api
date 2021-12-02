import express from 'express'
import {getLogs, getLog, postLog, deleteLog, updateLog} from '../controllers/logs.js'
import { jwtAccesTokenAuth } from '../middleware/jwtAuth.js'

const router = express.Router()

router.get('/', jwtAccesTokenAuth, (req, res) => getLogs(req, res))
router.get('/:id', jwtAccesTokenAuth, (req, res) => getLog(req, res) )
router.delete('/delete', jwtAccesTokenAuth, (req, res) => deleteLog(req, res))
router.patch('/update', jwtAccesTokenAuth, (req, res) => updateLog(req, res))
router.post('/new', jwtAccesTokenAuth, (req, res) => postLog(req, res))

export default router;
