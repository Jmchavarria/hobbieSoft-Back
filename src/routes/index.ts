
import { Router } from "express";
import userRoutes from './users/index'
import roleRoutes from './roles/index'
import authRoutes from './auth/auth.routes'
import { isAuthenticated } from '../middlewares'

const router = Router();

router.use('/auth', authRoutes)
router.use('/hola', (req, res) => {
    res.send('HOLAAA')
})
router.use('/', isAuthenticated, userRoutes)
router.use('/', isAuthenticated, roleRoutes)
router.use

export default router