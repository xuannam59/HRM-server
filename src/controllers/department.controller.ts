import { Request, Response } from "express";
import User from "../models/user.model";
import Department from "../models/department.model";
import Employee from "../models/employee.model";
import { ObjectId } from "mongoose";
import Position from "../models/position.model";
import Specialize from "../models/specialize.modal";
import { title } from "process";
import mongoose from "mongoose";

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
            current: Number(current),
            pageSize: Number(pageSize),
            total: total,
        };

        const skip: number = (objectPagination.current - 1) * objectPagination.pageSize;
        const departments: any = await Department
            .find({ deleted: false, })
            .skip(skip)
            .limit(objectPagination.pageSize);

        const items: any[] = [];
        for (const item of departments) {
            const infoUser = await User.findOne({
                _id: item.createdBy,
                deleted: false
            }).select("fullName");
            items.push({
                ...item._doc,
                infoCreatedBy: infoUser?.fullName,
                employeeQuantity: item.employeeList.length,
            })
        }

        res.status(200).json({
            message: "Get Department",
            data: items,
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

// [GET] /department/detail-employee/:idDepartment
export const getDepartmentEmployee = async (req: Request, res: Response) => {
    const { current, pageSize } = req.query
    const { idDepartment } = req.params;
    try {
        const department = await Department.findOne({
            _id: idDepartment,
            deleted: false
        });

        const idsEmployee: string[] = [];
        department.employeeList.forEach((item) => {
            idsEmployee.push(item.employeeId.toString());
        });
        const total = await Employee.countDocuments({
            _id: { $in: idsEmployee },
            deleted: false
        });
        const objectPagination: {
            current: number,
            pageSize: number,
            total?: number,
        } = {
            current: Number(current),
            pageSize: Number(pageSize),
            total: total,
        };

        const skip: number = (objectPagination.current - 1) * objectPagination.pageSize;
        const employees: any = await Employee
            .find({
                _id: { $in: idsEmployee },
                deleted: false,
            })
            .skip(skip)
            .limit(objectPagination.pageSize);

        const items: any[] = [];
        for (const item of employees) {
            const infoPosition = await Position.findOne({
                _id: item.positionId,
                deleted: false
            }).select("title");

            const infoSpecialize = await Specialize.findOne({
                _id: item.specializeId,
                deleted: false
            });
            items.push({
                ...item._doc,
                infoPosition: infoPosition?.title,
                infoSpecialize: infoSpecialize?.title,
            })
        }

        res.status(200).json({
            message: "Department Employee",
            data: items,
            departmentTitle: department.title,
            meta: objectPagination,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [GET] /department/detail-employee/list-employee
export const getListEmployee = async (req: Request, res: Response) => {
    try {
        const listEmployee = await Employee.find({
            departmentId: "",
            deleted: false
        });
        res.status(200).json({
            message: "Department Employee",
            data: listEmployee,
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

// [POST] /departments/detail-employee/delete/:id
export const deleteDepartmentEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existEmployee = await Employee.findOne({
            _id: id,
            deleted: false
        });
        if (!existEmployee) {
            throw new Error("Nhân viên này không tồn tại");
        }

        var objectId = new mongoose.Types.ObjectId(id);


        await Department.updateOne({
            "employeeList.employeeId": objectId
        }, {
            $pull: { employeeList: { employeeId: objectId } }
        });

        await Employee.updateOne({
            _id: id,
            deleted: false
        }, {
            departmentId: ""
        });
        res.status(202).json({
            message: "Deleted Employee",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /departments/detail-employee/add
export const addDepartmentEmployee = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const existEmployee = await Employee.findOne({
            _id: data.employeeId,
            departmentId: data.departmentId,
            deleted: false
        });

        data.employeeId = new mongoose.Types.ObjectId(data.employeeId);
        if (existEmployee) {
            throw new Error("Vui lòng chọn lại nhân viên , nhân viên này đã ở phòng ban khác");
        }

        await Employee.updateOne({
            _id: data.employeeId
        }, {
            departmentId: data.departmentId,
        })

        await Department.updateOne({
            _id: data.departmentId
        }, {
            $push: { employeeList: { employeeId: data.employeeId } }
        });

        res.status(202).json({
            message: "Deleted Employee",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}