import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
    teacherId: String,
    fullName: String,
    email: String,
    passport: String,
    avatar: String,
    gender: String,
    subject: String,
    phoneNumber: String,
    class: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: String
}, {
    timestamps: true,
});

const Teacher = mongoose.model("Teacher", teacherSchema, "teachers");

export default Teacher;