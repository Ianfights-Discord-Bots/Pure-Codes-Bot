import { Codes } from "../models/codes"
export const getStock = async () => {
    const code = await Codes.find({ claimed: false });
    return await code.length;
}