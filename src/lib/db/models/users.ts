import { Schema, model } from "mongoose";

const users = new Schema(
    {
        userId: {
            type: String,
            required: true
        },

        amountSpent: {
            type: Number,
            required: true
        },

        codesPurchased: {
            // [{codeValue: "A7BW-AJKD-ASDKJH-ALSDKJ", date: JSDateObject}]
            type: Array,
            reqired: true
        }
    },
    { timestamps: true }
);

const Users = model("users", users);

export { Users as Users };
