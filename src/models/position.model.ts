import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    title: String,
    description: String,
    salary: Number,
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

const Position = mongoose.model("Position", positionSchema, "positions");

export default Position;