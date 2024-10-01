import mongoose from "mongoose";

const specializeSchema = new mongoose.Schema({
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

const Specialize = mongoose.model("Specialize", specializeSchema, "specializes");

export default Specialize;