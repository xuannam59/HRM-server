import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeId: String,
    fullName: String,
    gender: String,
    birthday: Date,
    phoneNumber: String,
    address: String,
    avatar: String,
    passport: String,
    email: String,
    status: String,
    positionId: String,
    levelId: String,
    specializeId: String,
    deportmentId: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: String,
}, {
    timestamps: true,
});

const Employees = mongoose.model("Employees", employeeSchema, "employees");

export default Employees;