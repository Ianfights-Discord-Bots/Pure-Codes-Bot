import { Transactions } from "../models/transactions"

export const addTransaction = async (user, codeValue, price,paymentMethod, type? ) => {
    const newConfig = new Transactions({
        userPurchased: user,
        codeValue: codeValue,
        price: price,
        date: new Date(),
        purchaseType: type,
        paymentMethod: paymentMethod
    });

    newConfig.save().catch(err => console.log(err));
}