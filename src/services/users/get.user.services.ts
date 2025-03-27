import { db } from "../../config";

export const getUser = async (userId: string) => {
    try {
        const user = await db.users.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("Usuario no encontrado en la base de datos.");
        }

        return user;
    } catch (error: any) {
        console.error("Error al obtener el usuario:", error.message);

        if (error.message.includes("Can't reach database server")) {
            throw new Error(
                "No se puede conectar a la base de datos. Verifica que el servidor esté corriendo en `localhost:5432`."
            );
        }

        throw new Error("Error inesperado al obtener el usuario.");
    }
};
