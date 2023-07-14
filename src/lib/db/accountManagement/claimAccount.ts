import { Accounts } from "../models/accounts"

export const claimAccount = async (type: string, amount: number) => {
    const accounts = await Accounts.find({ type: type, sold: false });

    const userAccounts = [];

    if (await accounts.length < amount) {
        return 'Not enough stock';
    }

    for (let i = 0; i < amount; i++) {
        Accounts.updateOne({ _id: accounts[i]._id }, { sold: true }, (err) => {
            console.log(`Account ${accounts[i].loginEmail} sold at ${new Date()}`);
            if (err) {
                throw err;
            }
        });
        userAccounts.push(accounts[i])
    }

return await userAccounts;
}