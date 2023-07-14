import { Accounts } from "../models/accounts"

export const addAccount = async (
    email: string,
    password: string,
    price: number,
    type: string,
    description: string,
) => {

    // const accounts = new Accounts({
    //     type,
    //     email,
    //     password,
    //     price,
    //     description,
    //     sold: false
    // });

    const accounts = new Accounts({
        loginEmail: email,
        password: password,
        price: price,
        type: type,
        description: description,
        sold: false
    })

    accounts.save().catch(err => console.log(err));
}