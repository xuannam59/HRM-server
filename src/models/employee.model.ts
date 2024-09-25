import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
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
    position: Number,
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