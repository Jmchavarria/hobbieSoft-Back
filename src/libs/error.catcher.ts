import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

interface IError {
  msg: string;
  type: string;
  value: any;
  path: string;
  location: string;
}
export const errorCatcher = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req)
    .formatWith(({ msg, type, value, path, location }: any) => {
      return {
        message: msg,
        type: type,
        value: value,
        path: path,
        location: location,
      };
    })
    .array();

  if (errors.length > 0) {
    console.log('ESTO ES LO QUE ME MUESTRA EN EL BACK', errors)
    return res.status(400).json({ errors: errors });
  }

  next();
};