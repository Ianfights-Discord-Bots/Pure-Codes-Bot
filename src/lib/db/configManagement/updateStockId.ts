import { Config } from "../models/config";

export const updateStockId = async (newStockId: string) => {
    const serverId = process.env.guildId
    const oldConfig = Config.findOne({ serverId: serverId });
    if (!await oldConfig) {
        // Server is not in the config so add them with their settings

        const newConfig = new Config({
            serverId: serverId,
            lastStockId: newStockId
        });

        newConfig.save().catch(err => console.log(err));
        return;
    }

    // Server exists in the config 
    Config.updateOne({ serverId: serverId }, { lastStockId: newStockId }, (err) => {
        if (err) throw err;
    });
}