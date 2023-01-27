import { Codes } from "../models/codes";
import { Util } from 'oldschooljs'
export const addCodes = (code: string, pricePurchased: string, gpRate: number) => {


    const codes = new Codes({
        codeValue: code,
        claimed: false,
        pricePurchased: Util.fromKMB(pricePurchased),
        gpRate: gpRate
    });

    codes.save().catch(err => console.log(err));


}