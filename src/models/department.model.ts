import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    userId: String,
    position: String,
    wage: String,
    workDay: Number,
    allowance: Number,
    advance: Number,
    status: String,
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