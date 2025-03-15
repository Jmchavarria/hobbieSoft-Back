import { db } from "../../config/db.config"
import { roleServices } from "../../services"
import { ExpressController } from "../../types/expressController"


export const getAll: ExpressController = async (req, res) => {

    try {
        const roles = await db.roles.findMany({
            include: {
                permissions: {
                include: {
                    module: {
                        select: {
                            name: true, 
                            permissions: true
                        }
                    }
                }
                    
                }
            }

        })

        res.status(200).json(roles)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to retrieve Roles' })
    }
}

export const getOneRole: ExpressController = async (req, res, next) => {
    const { id } = req.params
    try {

        res.status(200).json(await roleServices.getRole(id))

    } catch (error) {
        console.error('Error to get user: ', error)
        next(error)

    }
}





