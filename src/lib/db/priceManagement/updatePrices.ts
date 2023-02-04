import { Prices } from "../models/prices";

export const updatePrices = async (price: number) => {
    const serverId = process.env.guildId
    const oldConfig = Prices.findOne({ serverId: serverId });
    if (!await oldConfig) {
        // Server is not in the config so add them with their settings

        const newConfig = new Prices({
            serverId: serverId,
            price: price
        });

        newConfig.save().catch(err => console.log(err));
        return;
    }

    // Server exists in the config 
    Prices.updateOne({ serverId: serverId }, { price: price }, (err) => {
        if (err) throw err;
    });
}