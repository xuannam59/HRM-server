import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const getAccessToken = (payload: {
    id: Types.ObjectId,
    email: string | null | undefined,
    rule?: number
}) => {

    const token = jwt.sign(payload, process.env.SECRET_KEY as string);

    return token;
}

export default getAccessToken;