import { Codes } from "../models/codes";

export const removeCode = async (amount: number) => {
    const code = await Codes.find({claimed: false});
    // console.log(await code)

    for(let i = 0;i<amount;i++){
        // console.log(code[i].codeValue)
    }
    
}


