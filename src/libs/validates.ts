import { validationResult } from "express-validator";

export const validateResult = (req: any , res: any, next: any ) => {
  const errors = validationResult(req)
    .formatWith(({ type, msg, path, location }: any) => {
      // Filtra mensajes técnicos o irrelevantes
      if (msg.includes("Invalid `db.users.findUnique()` invocation")) {
        return null; // Excluye el mensaje técnico
      }

      return {
        type: type, 
        path: path,
        location,
        message: msg,
      };
    })
    .array()
    .filter(Boolean); // Remueve valores `null`

  // Eliminar mensajes duplicados (basado en el campo)
  const uniqueErrors = Array.from(
    new Map(errors.map((error) => [error?.path, error])).values()
  );

  if (uniqueErrors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors: uniqueErrors,
    });
  }

  next();
};
