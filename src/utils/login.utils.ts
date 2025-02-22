import { CustomValidator } from "express-validator";
import { db } from "../config"
import bcrypt from 'bcrypt'

export const validateEmailCredential = async (valueEmail: string) => {
    const email = await db.users.findUnique({
        where: { email: valueEmail }
    })

    if (!email) {
        
        throw new Error("Incorrect email or password");
    }
}

export const validatePasswordCredential: CustomValidator = async (value: string, { req }) => {
    const { email, password } = req.body


    const user = await db.users.findUnique(
        {
            where:
                { email: email }
        }

    )
    

    if (!user) {
        throw new Error('Incorrect email or password')
    } else {

        if(!password){
            throw new Error('Incorrect email or password')
        }
        const validPassword = bcrypt.compareSync(password, user?.password as string)


        if (!validPassword) {
            throw new Error("Incorrect email or password");
        }
        else if (user?.status === false) {
            throw new Error(`The user is disabled ${email}`);
        }
    }
}





