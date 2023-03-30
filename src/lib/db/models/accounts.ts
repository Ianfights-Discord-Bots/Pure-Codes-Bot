import { Schema, model } from "mongoose";

// interface Codes{
//     codeValue: String,
//     claimed?: Boolean
//     pricePurchased: Number
// }



const accounts = new Schema(
    {
        loginEmail: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        pin: {
            type: String,
            required: false,
            default: 'N/A'
        },

        price: {
            type: Number,
            reqired: true
        },

        type: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        bans: {
            type: Array<object>,
            required: false
        },

        emailLinked: {
            type: String,
            default: 'N/A',
            required: true
        },

        sold: {
            type: Boolean,
            default: false,
            required: true,

        }
    },
    { timestamps: true }
);

const Accounts = model("accounts", accounts);

export { Accounts as Accounts };
