import { db } from "../../config"

export const getUser = async (id: string) => {

    try {
        const user = await db.users.findUnique({
            where:
                { id }
        })

        return{
            user
        }
    } catch (error) {
        console.error('User not foun in this peticion')
        throw new Error('User not foun in this peticion')
    }
}