import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: String,
    fullName: String,
    gender: String,
    birthday: Date,
    phoneNumber: String,
    address: String,
    avatar: String,
    specialize: String,
    status: String,
    role: String,
    schedule: String,
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