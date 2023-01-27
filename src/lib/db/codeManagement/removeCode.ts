import { Codes } from "../models/codes";

export const removeCode = async (amount: number) => {
    const code = await Codes.find({ claimed: false });
    // console.log(await code)

    const userCodes = []

    for (let i = 0; i < amount; i++) {
        // console.log(code[i].codeValue)
        // Bal.updateOne({ userId: userId }, prevLevel, (err) => {
        Codes.updateOne({ codeValue: code[i].codeValue }, { claimed: true });
        userCodes.push(code[0].codeValue)
    }

    return userCodes;
}


