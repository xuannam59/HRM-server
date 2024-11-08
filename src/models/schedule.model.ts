import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    title: String,
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    day: String,
    subject: String,
    startTime: Date,
    endTime: Date,
    room: String,
    descriptions: String,
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

const Schedule = mongoose.model("Schedule", scheduleSchema, "schedules");

export default Schedule;