import { Schema, model } from "mongoose";

interface purchase {
    purchaseType: 'Code' | 'Account' | 'Gold' | 'Other',
    quantity: number,
    pricePerUnit: number,
    totalPurchaseAmount: number,
    employee: string,
    date: Date
}

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
            type: Array<purchase>,
            reqired: true
        }
    },
    { timestamps: true }
);

const Users = model("users", users);

export { Users as Users };
