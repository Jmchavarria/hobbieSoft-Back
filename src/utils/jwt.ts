import jwt from "jsonwebtoken";
import { envs } from "../config";


export const generateToken = (user: any) => {

  return jwt.sign(user, envs.JWT_SECRET_KEY, { expiresIn: '1h'  } )

};
