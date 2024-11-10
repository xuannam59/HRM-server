import { Request, Response } from "express";
import Salary from "../models/salary.model";

// [GET] /salaries
export const getSalaries = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Salary.countDocuments({ deleted: false });
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
        const salaries = await Salary
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .populate("employeeId", "fullName position")
            .sort({
                createdAt: "desc"
            });


        res.status(200).json({
            message: "Get reward-discipline",
            data: salaries,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET] /salaries/:userId
export const getSalariesById = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const salaries = await Salary
            .find({
                employeeId: userId,
                deleted: false
            })
            .populate("employeeId", "fullName position");

        res.status(200).json({
            message: "Get reward-discipline by id",
            data: salaries
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /salaries/create
export const createSalary = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newSalaries = new Salary(data);
        await newSalaries.save();
        res.status(200).json({
            message: "Create reward-iscipline",
            data: newSalaries
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /salaries/edit/:id
export const updateSalary = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const salary = await Salary.findOne({
            _id: id,
            deleted: false
        });
        if (!salary) {
            throw new Error("Thưởng/kỷ luật này không tồn tại!");
        }
        await Salary.updateOne({ _id: id }, data);
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

// [POST] /salaries/delete/:id
export const deleteSalary = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const salary = await Salary.findOne({
            _id: id,
            deleted: false
        });
        if (!salary) {
            throw new Error("Thưởng/kỷ luật này không tồn tại!");
        }
        await Salary.deleteOne({ _id: id });
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

