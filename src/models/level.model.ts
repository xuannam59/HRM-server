import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    title: String,
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

const Level = mongoose.model("level", levelSchema, "levels");

export default Level;