import { CustomValidator } from "express-validator";
import { db } from "../config/db.config";

export const validateUserExistsOnDbById: CustomValidator = async (
    value: string,
    { req }
  ) => {
    const user = await db.users.findFirst({
      where: {
        id: value,
      },
    });
  
    if (!user) {
      throw new Error(`The user ID ${value} does not exist.`);
    }
    return true;
  };