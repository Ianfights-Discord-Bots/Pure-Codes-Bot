import { Schema, model } from "mongoose";


const transactions = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        codeValue: {
            type: String,
            required: true
        },
        userPurchased: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        purchaseType: {
            type: String,
            required: false,
            default: 'Code'
        },
        paymentMethod: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Transactions = model("transactions", transactions);

export { Transactions as Transactions };
