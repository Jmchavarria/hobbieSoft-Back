// import { Request, Response, NextFunction } from "express";

import { NextFunction, Request, Response } from "express";

// interface CustomErrorFormat {
//     message: string;
//     type?: string;
//     value?: any;
//     path?: string;
//     location?: string;
// }

// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


//     // Si el error no es una instancia de Error, creamos una para capturar el stack
//     const errorInstance = err instanceof Error ? err : new Error(err.message || "Unknown Error");

//     console.error("🔥 Error capturado en middleware:");
//     console.error("🔹 Mensaje:", errorInstance.message);
//     console.error("🔹 Stack:", errorInstance.stack || "No stack available"); // Ahora siempre hay stack
//     console.error("🔹 Path:", req.path);
//     console.error("🔹 Método:", req.method);
//     console.error("🔹 Body:", req.body);

//     const statusCode = err.status || 500;

//     const errors: CustomErrorFormat[] = [];

//     if (err.errors && Array.isArray(err.errors)) {
//         err.errors.forEach((error: any) => {
//             errors.push({
//                 message: error.message || "Invalid input",
//                 type: error.type || "field",
//                 value: error.value,
//                 path: error.path,
//                 location: error.location || "body",
//             });
//         });
//     } else {
//         errors.push({
//             message: errorInstance.message || "Internal Server Error",
//             type: "general",
//             path: "Internal Server Error",
//         });
//     }

//     res.status(statusCode).json({ status: "error", errors });
// };




interface CustomErrorFormat {
    message: string;
    type?: string;
    value?: any;
    path?: string;
    location?: string;
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error)

    const errors: CustomErrorFormat[] = []

    if (error.errors) {

        error.errors.forEach((error: any) => {
            errors.push({
                message: error.message || "Invalid input",
                type: error.type || "field",
                value: error.value,
                path: error.path,
                location: error.location || "body",
            });
        })
    } else {
        errors.push({
            message: error.message || "Internal Server Error",
            type: "general",
        });
    }

    const statusCode = error.status || 500;

    res.status(statusCode).json({ status: "error", errors });
}
