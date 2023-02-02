import { Schema, model } from "mongoose";



const config = new Schema(
    {
        serverId: {
            type: String,
            required: true
        },
        lastStockId: {
            type: String,
            required: true
        },
        
    },
    { timestamps: true }
);

const Config = model("config", config);

export { Config as Config };
