import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
    .formatWith(({ type, msg, path, location }: any) => {
      if (msg.includes("Invalid `db.users.findUnique()` invocation")) {
        return null; // Excluye mensajes técnicos
      }
      return { type, path, location, message: msg };
    })
    .array()
    .filter(Boolean); // Remueve valores `null`

  if (errors.length > 0) {
    return next({ status: 400, message: "Validation Error", errors }); // ⬅️ Pasamos el error a errorHandler
  }

  next();
};
