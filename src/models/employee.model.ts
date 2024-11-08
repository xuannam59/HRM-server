import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: String,
    fullName: String,
    gender: String,
    birthday: Date,
    phoneNumber: String,
    address: String,
    avatar: String,
    position: String,
    status: String,
    role: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: String,
}, {
    timestamps: true,
});

const Employee = mongoose.model("Employee", employeeSchema, "employees");

export default Employee;