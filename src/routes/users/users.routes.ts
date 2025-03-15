
import { Router } from 'express'
import { userController } from '../../controllers'
import { isAuthenticated } from '../../middlewares/isAuthenticated.midlleware'

const router = Router() 

const { getAll, getUser } = userController

router.get('/',)

router.get('/getAll',getAll)

router.get('/:id', getUser)

export default router