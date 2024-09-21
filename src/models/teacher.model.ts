import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
    teacherId: String,
    fullName: String,
    birdDay: Date,
    email: String,
    passport: String,
    avatar: String,
    gender: String,
    subject: String,
    phoneNumber: String,
    class: String,
    status: {
        type: String,
        default: "active"
    },
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