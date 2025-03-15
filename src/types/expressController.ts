import { Request, Response, NextFunction } from "express"

export interface CustomRequest extends Request {
    uuid?: string;
    authUser?: any;
}

export type ExpressController = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => Promise<void  >