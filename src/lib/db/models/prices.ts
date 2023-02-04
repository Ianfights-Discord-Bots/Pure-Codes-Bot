import { Schema, model } from "mongoose";



const prices = new Schema(
    {
        serverId: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        
    },
    { timestamps: true }
);

const Prices = model("prices", prices);

export { Prices as Prices };
