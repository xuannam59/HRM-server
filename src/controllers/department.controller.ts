import { Request, Response } from "express";
import Department from "../models/department.model";


// [GET] /departments
export const getDepartments = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Department.countDocuments({ deleted: false });
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
        const departments = await Department
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize);

        res.status(200).json({
            message: "Get Department",
            data: departments,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET] /departments/all
export const getAllDepartment = async (req: Request, res: Response) => {
    try {
        const allDepartment = await Department.find({
            deleted: false
        });

        res.status(200).json({
            message: "All Department",
            data: allDepartment
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /departments/create
export const createDepartment = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        delete data.createdAt;
        const department = await Department.findOne({
            title: data.title,
            deleted: false
        });
        if (department) {
            throw new Error("Phòng ban này đã có!");
        }

        const newDepartment = new Department(data);
        await newDepartment.save();
        res.status(200).json({
            message: "Create Department",
            data: newDepartment
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /departments/edit/:id
export const updateDepartment = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const department = await Department.findOne({
            _id: id,
            deleted: false
        });
        if (!department) {
            throw new Error("Phòng ban này không tồn tại!");
        }
        await Department.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update department",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /departments/delete/:id
export const deleteDepartment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const department = await Department.findOne({
            _id: id,
            deleted: false
        });
        if (!department) {
            throw new Error("Phòng ban này không tồn tại!");
        }
        await Department.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete department",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}
