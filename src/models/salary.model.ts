import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    position: String,
    baseSalary: Number, // lương cơ sở
    salaryCoefficient: Number,// hệ số lương
    allowance: {
        type: Number,
        default: 0
    }, // phụ cấp thâm niêm
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const Salary = mongoose.model("Salary", salarySchema, "salaries");

export default Salary;