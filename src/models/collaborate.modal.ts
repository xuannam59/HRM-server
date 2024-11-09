import mongoose from "mongoose";

const collaborateSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    unitName: String,
    date: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const Collaborate = mongoose.model("Collaborate", collaborateSchema, "collaborates");

export default Collaborate;