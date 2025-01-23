import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient()

export const connectDB = async () => {
    try {
        await db.$connect()
        console.log('Conectado exitosamente a la base de datos')
    } catch (error: any) {
        console.error('error', error)
        throw new Error(error)
    }

}


