import mongoose from "mongoose";

const forestingSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    subject: String,
    schedule: String,
    status: String,
    startTime: Date,
    endTime: Date,
    room: String,
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const Fostering = mongoose.model("Fostering", forestingSchema, "fostering");

export default Fostering;