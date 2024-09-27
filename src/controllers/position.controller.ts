import { Request, Response } from "express";
import Position from "../models/position.model";

// [GET] /positions
export const getPositions = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await Position.countDocuments({ deleted: false });
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
        const positions = await Position
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize);


        res.status(200).json({
            message: "Get position",
            data: positions,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET]/positions/all
export const getAllPosition = async (req: Request, res: Response) => {
    try {
        const allPosition = await Position.find({
            deleted: false
        });

        res.status(200).json({
            message: "All position",
            data: allPosition
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}


// [POST] /positions/create
export const createPosition = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        delete data.createdAt;
        const position = await Position.findOne({
            title: data.title,
            deleted: false
        });
        if (position) {
            throw new Error("Chữ vụ này đã có!");
        }

        const newPosition = new Position(data);
        await newPosition.save();
        res.status(200).json({
            message: "Create position",
            data: newPosition
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /positions/edit/:id
export const updatePosition = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        console.log(data);
        const position = await Position.findOne({
            _id: id,
            deleted: false
        });
        if (!position) {
            throw new Error("Chữ vụ này không tồn tại!");
        }
        await Position.updateOne({ _id: id }, data);
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

// [POST] /positions/delete/:id
export const deletePosition = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const position = await Position.findOne({
            _id: id,
            deleted: false
        });
        if (!position) {
            throw new Error("Chữ vụ này không tồn tại!");
        }
        await Position.deleteOne({ _id: id });
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

