import mongoose from "mongoose";

const RewardDisciplineSchema = new mongoose.Schema({
    title: String,
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    types: String,
    content: String,
    description: String,
    createdBy: String,
    updatedBy: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const RewardDiscipline = mongoose.model("RewardDiscipline", RewardDisciplineSchema, "reward-disciplines");

export default RewardDiscipline;