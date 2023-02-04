import { Config } from "../models/config"
export const getLastId = async () => {
    const id = await Config.findOne({ serverId: process.env.guildId });
    return await id ? await id.lastStockId : null
}