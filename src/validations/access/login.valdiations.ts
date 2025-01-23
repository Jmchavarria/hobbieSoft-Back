import { check } from "express-validator";
import { validateEmailCredential, validatePasswordCredential } from "../../utils";
import { errorCatcher, validateResult } from "../../libs";

export const loginCredentialsValidations = [
    check("email")
        .isEmail()
        .withMessage("Ingresa un email correcto")
        .notEmpty()
        .withMessage("Email is required")
        .custom(validateEmailCredential),
    check('password').notEmpty().withMessage('Password is required').custom(validatePasswordCredential),
    validateResult
];


