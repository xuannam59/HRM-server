import { Request, Response } from "express";
import Schedule from "../models/schedule.model";
import Employees from "../models/employee.model";

// [GET] /schedules
export const getSchedules = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Schedule.countDocuments({ deleted: false });
        const objectPagination: {
            current: number,
            pageSize: number,
            total: number,
        } = {
            current: +current,
            pageSize: +pageSize,
            total: total,
        };

        const skip: number = (objectPagination.current - 1) * objectPagination.pageSize;
        const schedules = await Schedule
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .populate("employeeId", "_id fullName")
            .sort({
                day: "asc",
                startTime: "asc"
            });


        res.status(200).json({
            message: "Get schedules",
            data: schedules,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET] /schedules/:userId
export const getSchedulesById = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const schedules = await Schedule
            .find({
                employeeId: userId,
                deleted: false
            })
            .populate("employeeId", "_id fullName");

        res.status(200).json({
            message: "Get schedules by id",
            data: schedules
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [GET] /schedules/teacher
export const getTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await Employees.find({
            position: "Giáo viên",
            deleted: false
        }).select("_id fullName");

        res.status(200).json({
            message: "Get teachers",
            data: teachers
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /schedules/create
export const createSchedule = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        delete data.createdAt;
        const schedule = await Schedule.findOne({
            title: data.title,
            deleted: false
        });

        const newSchedule = new Schedule(data);
        await newSchedule.save();
        res.status(200).json({
            message: "Create position",
            data: newSchedule
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /schedules/edit/:id
export const updatePosition = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const position = await Schedule.findOne({
            _id: id,
            deleted: false
        });
        if (!position) {
            throw new Error("Chữ vụ này không tồn tại!");
        }
        await Schedule.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update position",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /schedules/delete/:id
export const deletePosition = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const position = await Schedule.findOne({
            _id: id,
            deleted: false
        });
        if (!position) {
            throw new Error("Chữ vụ này không tồn tại!");
        }
        await Schedule.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete position",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

