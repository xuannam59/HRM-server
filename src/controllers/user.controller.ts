import { Request, Response } from "express"
import User from "../models/user.model";
import md5 from "md5";
import getAccessToken from "../utils/getAccessToken";
import { generateRandomNumber } from "../utils/generateRandomText";
import Employees from "../models/employee.model";
import { json } from "stream/consumers";

// [GET] /user
export const getUsers = async (req: Request, res: Response) => {
    let { current, pageSize, status } = req.query
    try {
        const find: any = {
            deleted: false
        };
        if (status) {
            find.status = status
        }
        const total = await User.countDocuments(find);
        const objectPagination: {
            current: number,
            pageSize: number,
            total: number,
        } = {
            current: Number(current),
            pageSize: Number(pageSize),
            total: total,
        };

        const skip: number = (objectPagination.current - 1) * objectPagination.pageSize;

        const employees: any = await User
            .find(find)
            .skip(skip)
            .limit(objectPagination.pageSize)
            .sort({ createdAt: "desc" })
            .select("-password");

        res.status(200).json({
            message: "employee",
            meta: objectPagination,
            data: employees,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.massage
        });
    }

}

// [GET] /user/not-account
export const getNotAccount = async (req: Request, res: Response) => {
    try {
        const user = await User.find({}).select("_id");
        const ids = user.map(item => {
            return item._id
        });
        const employee = await Employees.find({
            userId: { $nin: ids }
        }).select("_id fullName")

        res.status(200).json({
            message: "not account",
            data: employee,
        })
    } catch (error) {
        res.status(404).json({
            message: error.massage
        })
    }
}

// [POST] /auth/register
export const register = async (req: Request, res: Response) => {
    const body = req.body;
    const {
        email,
        password,
        confirmPassword,
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
            role: body.role,
            employeeId: body.employeeId,
        }

        const newUser: any = new User(data);
        await newUser.save();

        await Employees.updateOne(
            { _id: newUser.employeeId },
            {
                userId: newUser._id,
                role: body.role
            });

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

// [PATCH] /auth/update/:id
export const update = async (req: Request, res: Response) => {
    const body = req.body;
    const id: string = req.params.id;
    const {
        password,
        confirmPassword,
    } = body

    try {
        const isExist = await User.findOne({
            _id: id,
            deleted: false
        });
        if (!isExist) {
            throw new Error("Tài khoản không tồn tại");
        }
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                throw new Error("Password với confirmPassword không giống nhau!");
            }
            body.password = md5(body.password);
        }
        const data = {
            fullName: body.fullName,
            email: body.email,
            password: body.password ? body.password : isExist.password,
            role: body.role,
            employeeId: body.employeeId,
        }
        const result = await User.updateOne({ _id: id }, data);

        res.status(200).json({
            message: "Update",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
}

// [DELETE] /auth/deleted/:id
export const deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const isExist = await User.findOne({
            _id: id,
            deleted: false
        });
        if (!isExist) {
            throw new Error("Tài khoản không tồn tại");
        }
        const result = await User.deleteOne({
            _id: id
        })
        res.status(200).json({
            message: "Deleted user",
            data: result,
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