import { db } from "../../config/db.config"
import { userServices } from "../../services"
import { ExpressController } from "../../types/expressController"


export const getAll: ExpressController = async (req, res) => {

    try {
        const users = await db.users.findMany({
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                module: true
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to retrieve Users' })
    }
}

export const getUser: ExpressController = async (req, res, next) => {
    const { id } = req.params
    try {

        res.status(200).json(await userServices.getUser(id))

    } catch (error) {
        console.error('Error to get user: ', error)
        next(error)

    }
}








