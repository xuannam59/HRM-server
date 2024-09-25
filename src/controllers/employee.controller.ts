import { Request, Response } from "express";
import Employee from "../models/employee.model";
import md5 from "md5";

// [GET] /employees
export const getEmployees = async (req: Request, res: Response) => {
    let { current, pageSize, status } = req.query
    try {
        const find: any = {
            deleted: false
        };
        if (status !== "") {
            find.status = status
        }
        const total = await Employee.countDocuments(find);
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

        const employee = await Employee
            .find(find)
            .skip(skip)
            .limit(objectPagination.pageSize)
            .sort({ createdAt: "desc" });

        employee.forEach((item: any) => {
            delete item.password;
        });
        res.status(200).json({
            message: "employee",
            meta: objectPagination,
            data: employee,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.massage
        });
    }

}

//[GET]/employees/all
export const getAllEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployee = await Employee.find({
            deleted: false
        });

        res.status(200).json({
            message: "All employee",
            data: allEmployee
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /employees/create
export const createEmployee = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const total = await Employee.countDocuments();
        data.employeeId = "MNV2024" + total;
        const employee = await Employee.findOne({
            email: data.email,
            deleted: false
        });

        if (employee) {
            throw new Error("Email trùng với nhân viên khác, vui lòng nhập email khác");
        }

        const newEmployee = new Employee(data);
        await newEmployee.save();

        res.status(200).json({
            message: "Create Success",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
}

// [POST] /employees/update/:id
export const updateEmployee = async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const emailExist = await Employee.findOne({
            _id: { $ne: id },
            email: data.email,
            deleted: false
        });

        if (emailExist) {
            throw new Error("Email trùng với một giáo viên khác, vui lòng nhập lại");
        }

        if (data.password) {
            data.password = md5(data.password);
        }
        await Employee.updateOne({ _id: id }, data);

        res.status(200).json({
            message: "Update Successfully",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// [DELETE] /employees/delete/:id
export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findOne({ _id: id, deleted: false });
        if (!employee) {
            throw new Error("không tìm thấy giáo viên");
        }

        await Employee.updateOne({
            _id: id
        }, { deleted: true });
        res.status(200).json({
            message: "Delete Success",
            data: []
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// [GET] /employees/detail/:id
export const employeeDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findOne({
            _id: id,
            deleted: false
        });

        res.status(200).json({
            message: "employee detail",
            data: employee
        })
    } catch (error: any) {
        res.status(404).json({
            message: "Không tìm thấy giáo viên"
        })
    }
}