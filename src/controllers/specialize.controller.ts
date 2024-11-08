import { Request, Response } from "express";
import Position from "../models/schedule.model";
import Specialize from "../models/specialize.modal";
import User from "../models/user.model";

// [GET] /specializes
export const getSpecializes = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Specialize.countDocuments({ deleted: false });
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
        const specializes: any = await Specialize
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize);

        const items: any[] = [];
        for (const item of specializes) {
            const infoUser = await User.findOne({
                _id: item.createdBy,
                deleted: false
            }).select("fullName");
            items.push({
                ...item._doc,
                infoCreatedBy: infoUser?.fullName,
            })
        }

        res.status(200).json({
            message: "Get specialize",
            data: items,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET]/specializes/all
export const getAllSpecialize = async (req: Request, res: Response) => {
    try {
        const allSpecialize = await Specialize.find({
            deleted: false
        });

        res.status(200).json({
            message: "All specialize",
            data: allSpecialize
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


// [POST] /specializes/create
export const createSpecialize = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        delete data.createdAt;
        const specialize = await Specialize.findOne({
            title: data.title,
            deleted: false
        });
        if (specialize) {
            throw new Error("Chữ vụ này đã có!");
        }

        const newSpecialize = new Specialize(data);
        await newSpecialize.save();
        res.status(200).json({
            message: "Create specialize",
            data: newSpecialize
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /specializes/edit/:id
export const updateSpecialize = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const specialize = await Specialize.findOne({
            _id: id,
            deleted: false
        });
        if (!specialize) {
            throw new Error("Chữ vụ này không tồn tại!");
        }
        await Specialize.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update specialize",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /specializes/delete/:id
export const deleteSpecialize = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const specialize = await Specialize.findOne({
            _id: id,
            deleted: false
        });
        if (!specialize) {
            throw new Error("Chuyên môn này không tồn tại!");
        }
        await Specialize.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete specialize",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

