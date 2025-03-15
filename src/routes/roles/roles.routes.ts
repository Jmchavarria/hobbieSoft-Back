
import { Router } from 'express'
import { roleController } from '../../controllers'
import { isAuthenticated } from '../../middlewares/isAuthenticated.midlleware'

const router = Router()

const { getAll, getOneRole } = roleController


router.get('/',)

router.get('/getAll', getAll)


router.get('/:id', getOneRole)

export default router
