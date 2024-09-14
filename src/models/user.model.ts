import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: String,
    avatar: String,
    role: String,
    deleteAt: Date,
    deleteBy: String
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

export default User;