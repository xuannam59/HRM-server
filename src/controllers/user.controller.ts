import { Request, Response } from "express"
import User from "../models/user.model";
import md5 from "md5";

// [POST] /auth/register
export const register = async (req: Request, res: Response) => {
    const body = req.body;
    const {
        email,
        password,
        configPassword
    } = body
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("Tài khoản đã tồn tại");
        }
        if (password !== configPassword) {
            throw new Error("Password với configPassword không giống nhau!");
        }
        body.password = md5(body.password);
        const data = {
            fullName: body.fullName,
            email: body.email,
            password: body.password,
            role: "user"
        }

        const newUser = new User(data);
        await newUser.save();

        delete newUser["password"];
        res.status(200).json({
            message: "Register",
            data: body
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
}

// [POST] /auth/login
export const login = async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    try {
        res.status(200).json({
            message: "login",
            data: body
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
}



