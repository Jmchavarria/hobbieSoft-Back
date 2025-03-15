import { db } from "../../config"

export const getRole = async (id: string) => {

    try {
        const role = await db.roles.findUnique({
            where:
                { id }
        })

        return {
            role
        }
    } catch (error) {
        console.error('role not foun in this peticion')
        throw new Error('role not foun in this peticion')
    }
}