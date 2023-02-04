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

        pin: {
            type: Number,
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

        dateCreated: {
            type: String,
            required: true
        },

        dob: {
            type: String,
            required: true
        },

        creationIp: {
            type: String,
            required: true
        },

        bans:{
            type: Array,
            required: false
        },

        emailLinked: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Accounts = model("codes", accounts);

export { Accounts as Accounts };
