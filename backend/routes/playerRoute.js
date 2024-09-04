import express from 'express'
import { allData, register } from '../controllers/players.controller.js'
const router = express.Router()
router.get('/playersData',allData)
router.post('/register',register)
export default router