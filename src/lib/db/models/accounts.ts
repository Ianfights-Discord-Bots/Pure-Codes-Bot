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

        password: {
            type: String,
            required: true
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
