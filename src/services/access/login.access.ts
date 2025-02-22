
import { db } from "../../config/db.config";
import { generateToken } from "../../utils/jwt";
// import { Permission } from '../../types/users/permissions.types';

export const login = async (email: string) => {
    try {

        const user = await db.users.findUnique({
            where: {
                email: email,
            },
        });


        if (!user) {
            throw new Error("User not found");
            
        }



        const accessToken = generateToken(user)

        return {
            message: `Welcome ${user?.name} ${user?.lastName}`,
            info: {
                id: user?.id,
                accessToken
            }
        }


        // if(!user){
        //     throw new Error('No hay usuario con ese email ')
        // }


        // const permissions = await db.permissions.findMany(
        //     {
        //         where: { roleId: user?.roleId }
        //     }
        // )3

        // const token = await generateToken({ uuid: user?.id });

        // return {
        //     message: `Welcome ${user?.name} ${user?.lastName}`,
        //     info: {
        //         id: user?.id,
        //         // roleId: user?.roleId,
        //         token,
        //     }
        // }
    } catch (error: any) {
        console.error("Error al iniciar sesion:", error);
        throw new Error("Failed to log in");
    }
};