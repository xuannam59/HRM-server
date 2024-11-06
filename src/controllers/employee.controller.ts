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
        if (status) {
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

        const employees: any = await Employee
            .find(find)
            .skip(skip)
            .limit(objectPagination.pageSize)
            .sort({ createdAt: "desc" });

        res.status(200).json({
            message: "employee",
            meta: objectPagination,
            data: employees,
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

        const newEmployee = new Employee(data);
        await newEmployee.save();
        res.status(200).json({
            message: "Create Success",
            data: {
                _id: newEmployee._id,
                createdAt: newEmployee.createdAt
            }
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
        const employee = await Employee.findOne({
            _id: id,
            deleted: false
        });
        if (!employee) {
            throw new Error("Nhân viện không hợp lệ!");
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
            throw new Error("không tìm thấy nhân viên");
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
            message: "Không tìm thấy nhân viên"
        })
    }
}