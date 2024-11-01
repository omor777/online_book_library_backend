import { Request, Response, NextFunction } from "express";

const create = (req: Request, res: Response, next: NextFunction) => {
    try {
 
    } catch (e) {
        next(e)
        
    }
};


export default create;