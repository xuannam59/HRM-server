import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    updatedBy: String,
    employeeList: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const Department = mongoose.model("Department", departmentSchema, "departments");

export default Department;