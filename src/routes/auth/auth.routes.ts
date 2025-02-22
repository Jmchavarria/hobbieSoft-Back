import { Router } from 'express'
import { authController } from '../../controllers'
import { isAuthenticated } from '../../middlewares'
import { authValidations, userValidations } from '../../validations'

const { login, getUserInfo, logout} = authController
const { userIdValidations } = userValidations
const { loginCredentialsValidations } = authValidations

const router = Router()

router.get('/user/:id?', isAuthenticated, userIdValidations, getUserInfo)
router.post('/login', loginCredentialsValidations, login)
router.post('/logout', logout)
router.get('/cosa/:id?', isAuthenticated, (req: any, res: any) => {
    const {id} = req.params
    if(id){
        res.send('PRUEBAAAA')

    }else{
        res.send('NO PRUEBAAAA')    
    }
})

export default router 