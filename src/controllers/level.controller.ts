import { Request, Response } from "express";
import Level from "../models/level.model";

// [GET] /levels
export const getLevels = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Level.countDocuments({ deleted: false });
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
        const levels = await Level
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize);


        res.status(200).json({
            message: "Get level",
            data: levels,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET]/levels/all
export const getAllLevel = async (req: Request, res: Response) => {
    try {
        const allLevel = await Level.find({
            deleted: false
        });

        res.status(200).json({
            message: "All level",
            data: allLevel
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


// [POST] /levels/create
export const createLevel = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        delete data.createdAt;
        const level = await Level.findOne({
            title: data.title,
            deleted: false
        });
        if (level) {
            throw new Error("Trình độ này đã có!");
        }

        const newLevel = new Level(data);
        await newLevel.save();
        res.status(200).json({
            message: "Create level",
            data: newLevel
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /levels/edit/:id
export const updateLevel = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const level = await Level.findOne({
            _id: id,
            deleted: false
        });
        if (!level) {
            throw new Error("Trình độ này không tồn tại!");
        }
        await Level.updateOne({ _id: id }, data);
        res.status(200).json({
            message: "Update level",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /levels/delete/:id
export const deleteLevel = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const level = await Level.findOne({
            _id: id,
            deleted: false
        });
        if (!level) {
            throw new Error("Trình độ này không tồn tại!");
        }
        await Level.deleteOne({ _id: id });
        res.status(200).json({
            message: "Delete level",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

