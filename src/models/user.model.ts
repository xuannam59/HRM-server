import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    employeeId: String,
    rule: {
        type: Number,
        default: 0
    },
    phone: String,
    avatar: String,
    role: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
    deleteBy: String
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

export default User;