import { Schema, model } from "mongoose";



interface user {
    userId: string,
    totalSpent: number,
    purchases: any
}

const users = new Schema<user>(
    {
        userId: {
            type: String,
            required: true
        },

        totalSpent: {
            type: Number,
            required: true
        },
        purchases: {
            type: Array,
            reqired: true
        }
    },
    { timestamps: true }
);

const Users = model("users", users);

export { Users as Users };
