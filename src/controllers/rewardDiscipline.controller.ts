import { Request, Response } from "express";
import RewardDiscipline from "../models/rewardDiscipline.modle";

// [GET] /reward-discipline
export const getRewardDiscipline = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    try {
        const total = await RewardDiscipline.countDocuments({ deleted: false });
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
        const rewardDiscipline = await RewardDiscipline
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize)
            .populate("employeeId", "fullName")
            .sort({
                createdAt: "desc"
            });


        res.status(200).json({
            message: "Get reward-discipline",
            data: rewardDiscipline,
            meta: objectPagination
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        })
    }
}

//[GET] /reward-discipline/:userId
export const getRewardDisciplineById = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        const rewardDiscipline = await RewardDiscipline
            .find({
                employeeId: userId,
                deleted: false
            })
            .populate("employeeId", "_id fullName");

        res.status(200).json({
            message: "Get reward-discipline by id",
            data: rewardDiscipline
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /reward-discipline/create
export const createRewardDiscipline = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const newRewardDiscipline = new RewardDiscipline(data);
        await newRewardDiscipline.save();
        res.status(200).json({
            message: "Create reward-iscipline",
            data: newRewardDiscipline
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /reward-discipline/edit/:id
export const updateRewardDiscipline = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const rewardDiscipline = await RewardDiscipline.findOne({
            _id: id,
            deleted: false
        });
        if (!rewardDiscipline) {
            throw new Error("Thưởng/kỷ luật này không tồn tại!");
        }
        await RewardDiscipline.updateOne({ _id: id }, data);
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

// [POST] /reward-discipline/delete/:id
export const deleteRewardDiscipline = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rewardDiscipline = await RewardDiscipline.findOne({
            _id: id,
            deleted: false
        });
        if (!rewardDiscipline) {
            throw new Error("Thưởng/kỷ luật này không tồn tại!");
        }
        await RewardDiscipline.deleteOne({ _id: id });
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

