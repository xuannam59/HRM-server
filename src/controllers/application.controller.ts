import { Request, Response } from "express";
import Application from "../models/application.model";
import mongoose from "mongoose";

// [GET] /applications
export const getApplications = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Application.countDocuments({ deleted: false });
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
        const applications = await Application
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .sort({ createdAt: "desc" });


        res.status(200).json({
            message: "Get level",
            data: applications,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET]/applications/:id
export const getApplicationById = async (req: Request, res: Response) => {
    const _id: string = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            throw new Error("_id không hợp lệ");

        const application = await Application.findOne({
            _id,
            deleted: false
        });

        res.status(200).json({
            message: "get application by id",
            data: application
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


// [POST] /applications/create
export const createApplication = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newApplication = new Application(data);
        await newApplication.save();

        res.status(200).json({
            message: "Create level",
            data: {
                _id: newApplication._id,
                createAt: newApplication.createdAt
            }
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /applications/edit/:id
export const updateApplication = async (req: Request, res: Response) => {
    const data = req.body;
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            throw new Error("id không hợp lệ");

        const application = await Application.findOne({
            _id,
            deleted: false
        });
        if (!application) {
            throw new Error("Đơn ứng tuyển này không tồn tại!");
        }
        const result = await Application.updateOne({ _id }, data);
        res.status(200).json({
            message: "Update application",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /applications/delete/:id
export const deleteApplication = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            throw new Error("id không hợp lệ");

        const application = await Application.findOne({
            _id,
            deleted: false
        });

        if (!application) {
            throw new Error("Đơn tuyển dụng này không tồn tại!");
        }
        await Application.deleteOne({ _id });
        res.status(200).json({
            message: "Delete application",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

