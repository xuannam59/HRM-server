import { Request, Response } from "express";
import Employee from "../models/employee.model";
import md5 from "md5";
import Position from "../models/position.model";
import Level from "../models/level.model";
import Specialize from "../models/specialize.modal";
import Department from "../models/department.model";

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

        const items: any[] = [];
        for (const item of employees) {
            const infoPosition = await Position.findOne({
                _id: item.positionId,
                deleted: false
            }).select("title");
            const infoLevel = await Level.findOne({
                _id: item.levelId,
                deleted: false
            });
            const infoSpecialize = await Specialize.findOne({
                _id: item.specializeId,
                deleted: false
            });
            let titleDepartmentId: string = "";
            if (item.departmentId !== "") {
                const infoDepartment = await Department.findOne({
                    _id: item.departmentId,
                    deleted: false
                });
                titleDepartmentId = infoDepartment?.title;
            }

            items.push({
                ...item._doc,
                infoPosition: infoPosition?.title,
                infoLevel: infoLevel?.title,
                infoSpecialize: infoSpecialize?.title,
                infoDepartment: titleDepartmentId,
            })
        }

        res.status(200).json({
            message: "employee",
            meta: objectPagination,
            data: items,
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
            passport: data.passport,
            deleted: false
        });

        if (employee) {
            throw new Error("Vui lòng nhập đúng thẻ cccd của nhân viên");
        }

        const newEmployee = new Employee(data);
        await newEmployee.save();
        if (data.departmentId) {
            await Department.updateOne({
                _id: newEmployee.departmentId,
            }, {
                $push: { employeeList: { employeeId: newEmployee._id } }
            });
        } else {
            throw new Error("Phòng ban không hợp lệ");
        }
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
        const employee = await Employee.findOne({
            _id: id,
            passport: data.passport,
            deleted: false
        });
        if (!employee) {
            throw new Error("Nhân viện không hợp lệ!");
        }

        if (data.password) {
            data.password = md5(data.password);
        }

        if (data.departmentId) {
            await Department.updateOne({
                "employeeList.employeeId": employee._id
            }, {
                $pull: { employeeList: { employeeId: employee._id } }
            });

            await Department.updateOne({
                _id: data.departmentId
            }, {
                $push: { employeeList: { employeeId: employee._id } }
            });
        } else {
            throw new Error("Phòng ban không hợp lệ");
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