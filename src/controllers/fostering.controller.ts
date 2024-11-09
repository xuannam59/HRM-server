import { Request, Response } from "express";
import Fostering from "../models/fostering.model";


// [GET] /fostering
export const getFostering = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Fostering.countDocuments({ deleted: false });
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
        const fostering = await Fostering
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .populate({ path: 'employeeId', select: { fullName: 1 } });

        res.status(200).json({
            message: "Get fostering",
            data: fostering,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET] /fostering/all
export const getAllFostering = async (req: Request, res: Response) => {
    try {
        const allFostering = await Fostering.find({
            deleted: false
        });

        res.status(200).json({
            message: "All fostering",
            data: allFostering
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /fostering/create
export const createFostering = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const fostering = await Fostering.findOne({
            employeeId: data.employeeId,
            schedule: data.schedule,
            deleted: false
        });
        if (fostering) {
            throw new Error("Giáo viên đã có lịch bồi dưỡng này đã có!");
        }

        const newFostering = new Fostering(data);
        await newFostering.save();
        res.status(200).json({
            message: "Create Fostering",
            data: newFostering
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /fostering/edit/:id
export const updateFostering = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const fostering = await Fostering.findOne({
            _id: id,
            deleted: false
        });
        if (!fostering) {
            throw new Error("Lịch bồi dưỡng này không tồn tại!");
        }
        await Fostering.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update fostering",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /fostering/delete/:id
export const deleteFostering = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const fostering = await Fostering.findOne({
            _id: id,
            deleted: false
        });
        if (!fostering) {
            throw new Error("Lịch bồi dưỡng này không tồn tại!");
        }
        await Fostering.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete fostering",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}
