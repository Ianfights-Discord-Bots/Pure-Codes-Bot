import { Schema, model } from "mongoose";

interface Codes{
    codeValue: String,
    claimed?: Boolean
    pricePurchased: Number,
    gpRate: Number
}

const codes = new Schema<Codes>(
    {
        codeValue: {
            type: String,
            required: true
        },

        claimed: {
            type: Boolean,
            default: false,
            required: true
        },

        pricePurchased: {
            type: Number,
            reqired: true
        },
        
        gpRate: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Codes = model("codes", codes);

export { Codes as Codes };
