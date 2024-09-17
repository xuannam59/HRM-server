import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
    teacherId: String,
    email: String,
    avatar: String,
    fullName: String,
    sex: String,
    ethnicGroup: String,
    technical: String,
    passport: String,
    phoneNumber: String,
    birdDay: Date,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Teacher = mongoose.model("Teacher", teacherSchema, "teachers");

export default Teacher;