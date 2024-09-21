import { Request, Response } from "express";
import Teacher from "../models/teacher.model";
import md5 from "md5";

export const getTeachers = async (req: Request, res: Response) => {

    try {
        const teacher = await Teacher.find({});
        teacher.forEach((item: any) => {
            delete item.password;
        });
        res.status(200).json({
            message: "Teacher",
            data: teacher,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.massage
        });
    }

}

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        data.password = md5(data.password);
        const teacher = await Teacher.findOne({
            email: data.email,
            deleted: false
        });

        if (teacher) {
            throw new Error("Email trùng với giáo viên khác, vui lòng nhập email khác");
        }

        const newTeacher = new Teacher(data);
        await newTeacher.save();

        res.status(200).json({
            message: "Create Success",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


