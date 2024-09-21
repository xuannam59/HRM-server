import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization?.split(" ")[1] : "";

    try {
        if (!token) {
            throw new Error("Bạn không có quyền");
        }
        jwt.verify(token, process.env.SECRET_KEY as string);
        next();
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        })
    }


}

