import { Schema, model } from "mongoose";

interface Codes{
    codeValue: String,
    unclaimed?: Boolean
    pricePurchased: Number
}

const codes = new Schema<Codes>(
    {
        codeValue: {
            type: String,
            required: true
        },

        unclaimed: {
            type: Boolean,
            default: true,
            required: true
        },

        pricePurchased: {
            type: Number,
            reqired: true
        }
    },
    { timestamps: true }
);

const Codes = model("codes", codes);

export { Codes as Codes };
