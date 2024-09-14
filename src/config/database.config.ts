import mongoose from "mongoose"

export const connect = async (): Promise<void> => {
    const url = process.env.MONGOBD_URL;
    try {
        await mongoose.connect(`${url}`);
        console.log("Connect to db successfully");
    } catch (error) {
        console.log("Connect error")
    }
}
