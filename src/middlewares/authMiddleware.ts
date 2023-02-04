import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

require("dotenv").config();

export class AuthMiddleware {

    public static generateToken(payload: any): any {
        try {
            //create a JWT containing the user's id and other claims
            return jwt.sign(payload, process.env.JWT_SECRET);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public static async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.access_token;
            if (!token) {
                return res.status(401).json({message: "No token provided."});
            }

            req.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            return res.status(401).json({message: "Invalid token."});
        }
    }
}
