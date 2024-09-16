import { Request, Response } from "express"
import User from "../models/user.model";
import md5 from "md5";
import getAccessToken from "../utils/getAccessToken";

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

        const newUser: any = new User(data);
        await newUser.save();


        delete newUser._doc.password; // remove property password

        console.log(newUser);
        res.status(200).json({
            message: "Register",
            data: newUser,
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
    const { email, password } = body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Tài khoản không tồn tại!");
        }
        if (md5(password) !== user.password) {
            throw new Error("Mật khẩu không chính xác!");
        }

        const infoUser: any = await User.findOne({ email }).select("-password");

        res.status(200).json({
            message: "login",
            data: {
                ...infoUser._doc,
                token: getAccessToken({
                    id: infoUser._id,
                    email: infoUser.email,
                    rule: 0
                }),
            }
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
}



