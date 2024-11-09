import { Request, Response } from "express";
import Collaborate from "../models/collaborate.modal";
import User from "../models/user.model";

// [GET] /specializes
export const getCollaborates = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Collaborate.countDocuments({ deleted: false });
        const objectPagination: {
            current: number,
            pageSize: number,
            total: number,
        } = {
            current: +(current),
            pageSize: +(pageSize),
            total: total,
        };

        const skip: number = (objectPagination.current - 1) * objectPagination.pageSize;
        const collaborates = await Collaborate
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .populate({ path: "employeeId", select: { fullName: 1 } });

        res.status(200).json({
            message: "Get specialize",
            data: collaborates,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET]/specializes/all
export const getAllCollaborates = async (req: Request, res: Response) => {
    try {
        const allCollaborate = await Collaborate.find({
            deleted: false
        });

        res.status(200).json({
            message: "All collaborate",
            data: allCollaborate
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


// [POST] /specializes/create
export const createCollaborate = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const collaborate = await Collaborate.findOne({
            employeeId: data.employeeId,
            deleted: false
        });
        if (collaborate) {
            throw new Error("Giáo Viên đang trong quá trình công tác!");
        }

        const newCollaborate = new Collaborate(data);
        await newCollaborate.save();
        res.status(200).json({
            message: "Create newCollaborate",
            data: {
                _id: newCollaborate._id
            }
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /specializes/edit/:id
export const updateCollaborate = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const isExist = await Collaborate.findOne({
            _id: id,
            deleted: false
        });
        if (!isExist) {
            throw new Error("Công tác này không tồn tại!");
        }
        const result = await Collaborate.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update specialize",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /specializes/delete/:id
export const deleteCollaborate = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const isExist = await Collaborate.findOne({
            _id: id,
            deleted: false
        });
        if (!isExist) {
            throw new Error("Công tác này không tồn tại!");
        }
        const result = await Collaborate.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete specialize",
            data: result
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}
