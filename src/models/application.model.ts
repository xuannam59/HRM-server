import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    position: String,
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String,
    description: String,
    status: String,
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

const Application = mongoose.model("application", applicationSchema, "applications");

export default Application;