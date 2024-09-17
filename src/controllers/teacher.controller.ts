import { Request, Response } from "express";
import Teacher from "../models/teacher.model";

export const getTeachers = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "Teacher",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.massage
        });
    }

}


