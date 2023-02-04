import { Users } from "../models/users";

interface purchase {
    purchaseType: 'Code' | 'Account' | 'Gold' | 'Other',
    quantity: number,
    pricePerUnit: number,
    totalPurchaseAmount: number,
    employee: string,
    date: Date
}

export const updateUser = async (userId: string, transaction:purchase) => {
    const serverId = process.env.guildId
    const oldConfig = await Users.findOne({ userId: userId });
    if (!await oldConfig) {
        // Server is not in the config so add them with their settings

        const newConfig = new Users({
            userId: userId,
            totalSpent: transaction.totalPurchaseAmount,
            purchases: [transaction]
        });

        newConfig.save().catch(err => console.log(err));
        return;
    }

let bal = await oldConfig.totalSpent + transaction.totalPurchaseAmount
let txs = await oldConfig.purchases
// console.log(txs)
txs.push(transaction)
// console.log(txs)
    // Server exists in the config 
    Users.updateOne({ userId: userId }, {totalSpent: bal, purchases: txs  }, (err) => {
        if (err) throw err;
    });
}