import { Codes } from "../models/codes";

export const removeCode = async (amount: number) => {
    const code = await Codes.find({ claimed: false });

    const userCodes = []

    // Check if there are the amount of codes that we need in the db

    if(amount > await code.length){
        return 'Not Enough Codes'
    }

    for (let i = 0; i < amount; i++) {
        // console.log(code[i].codeValue)
        // Bal.updateOne({ userId: userId }, prevLevel, (err) => {
        Codes.updateOne({ codeValue: code[i].codeValue }, { claimed: true }, (err) => {
            console.log(`Code ${code[i].codeValue} claimed at ${new Date()}`);
            if(err){
                throw err;
            }
        });
        userCodes.push(code[i].codeValue)
    }

    return await userCodes;
}


