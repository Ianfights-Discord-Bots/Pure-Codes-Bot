import { Accounts } from "../models/accounts"

export const addAccount = async (
    email: string,
    username: string,
    password: string,
    price: number,
    type: string,
    description: string,
    bankPin?: number,
    emailLinked?: string
) => {

    const accounts = new Accounts({
        type,
        email,
        username,
        password,
        price,
        description,
        bankPin,
        emailLinked,
        sold: false
    });

    accounts.save().catch(err => console.log(err));
}