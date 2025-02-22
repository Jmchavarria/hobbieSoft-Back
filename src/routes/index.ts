
import { Router } from "express";
import userRoutes from './users/index'
import authRoutes from './auth/auth.routes'
import { isAuthenticated } from '../middlewares'

const router = Router();

router.use('/auth', authRoutes)
router.use('/hola', (req, res) => {
    res.send('HOLAAA')
})
router.use('/', isAuthenticated, userRoutes)

export default router