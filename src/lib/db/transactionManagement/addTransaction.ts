import { Transactions } from "../models/transactions"

export const addTransaction = async (user, codeValue, price) => {
    const newConfig = new Transactions({
        userPurchased: user,
        codeValue: codeValue,
        price: price,
        date: new Date()
    });

    newConfig.save().catch(err => console.log(err));
}