import { Prices } from "../models/prices"
export const getPrice = async () => {
    const id = await Prices.findOne({ serverId: process.env.guildId });
    return await id ? await id.price : null
}