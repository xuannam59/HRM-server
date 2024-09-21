import { Request, Response } from "express";
import Teacher from "../models/teacher.model";
import md5 from "md5";

// [GET] /teachers
export const getTeachers = async (req: Request, res: Response) => {

    try {
        const teacher = await Teacher.find({ deleted: false });
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

// [POST] /teachers/create
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

// [POST] /teachers/update/:id
export const updateTeacher = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const emailExist = await Teacher.findOne({
            _id: { $ne: id },
            email: data.email,
            deleted: false
        });

        if (emailExist) {
            throw new Error("Email trùng với một giáo viên khác, vui lòng nhập lại");
        }

        if (data.password) {
            data.password = md5(data.password);
        }
        await Teacher.updateOne({ _id: id }, data);

        res.status(200).json({
            message: "Update Successfully",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// [DELETE] /teacher/delete/:id
export const deleteTeacher = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findOne({ _id: id, deleted: false });
        if (!teacher) {
            throw new Error("không tìm thấy giáo viên");
        }

        await Teacher.updateOne({
            _id: id
        }, { deleted: true });
        res.status(200).json({
            message: "Delete Success",
            data: []
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}