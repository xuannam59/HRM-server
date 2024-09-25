import { Request, Response } from "express"
import User from "../models/user.model";
import md5 from "md5";
import getAccessToken from "../utils/getAccessToken";
import { generateRandomNumber } from "../utils/generateRandomText";

// [POST] /auth/register
export const register = async (req: Request, res: Response) => {
    const body = req.body;
    const {
        email,
        password,
        confirmPassword
    } = body
    try {
        const user = await User.findOne({
            email: email,
            deleted: false
        });
        if (user) {
            throw new Error("Tài khoản đã tồn tại");
        }
        if (password !== confirmPassword) {
            throw new Error("Password với confirmPassword không giống nhau!");
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

// [POST] /auth/register
export const loginWithGoogle = async (req: Request, res: Response) => {
    const body = req.body;
    const {
        email
    } = body
    try {
        const user: any = await User.findOne({
            email: email,
            deleted: false
        });
        if (user) {
            delete user._doc.password;
            res.status(200).json({
                message: "login",
                data: {
                    ...user._doc,
                    token: getAccessToken({
                        id: user._id,
                        email: user.email,
                        rule: 0
                    }),
                }
            });
            return;
        }
        body.password = md5(generateRandomNumber(6));
        const data = {
            fullName: body.fullName,
            email: body.email,
            password: body.password,
            role: "user",
            avatar: body.avatar
        }

        const newUser: any = new User(data);
        await newUser.save();

        delete newUser._doc.password; // remove property password
        res.status(200).json({
            message: "Register",
            data: {
                ...newUser._doc,
                token: getAccessToken({
                    id: newUser._id,
                    email: newUser.email,
                    rule: 0
                }),
            },
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
        const user: any = await User.findOne({
            email: email,
            deleted: false
        });
        if (!user || md5(password) !== user.password) {
            throw new Error("Đăng nhập thất bại!, vui lòng kiểm tra lại Email/Password và thử lại");
        }

        delete user._doc.password;
        res.status(200).json({
            message: "login",
            data: {
                ...user._doc,
                token: getAccessToken({
                    id: user._id,
                    email: user.email,
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

export const refreshToken = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const user = await User.findOne({
            _id: id,
            deleted: false
        });
        if (!user) {
            throw new Error("User not found!");
        }
        const token = getAccessToken({
            id: user._id,
            email: user.email,
            rule: user.rule
        })
        res.status(200).json({
            message: "refresh token",
            token: token
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}