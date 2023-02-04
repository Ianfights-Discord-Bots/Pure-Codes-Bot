import { EmbedBuilder } from 'discord.js';
import { client } from '..';
import * as fs from 'fs';
import { getStock } from '../lib/db/codeManagement/getStock';
import { getLastId } from '../lib/db/configManagement/getPreviousMessageId';
import { updateStockId } from '../lib/db/configManagement/updateStockId';

const channelId = process.env.channelId;

const updateStock = async () => {


    const channel = await client.channels.cache.get(channelId)

    const stock = new EmbedBuilder()
        .setColor('#46bdf0')
        .setTitle('Stock')
        .setDescription(`14 Day: **${await getStock()}**`);             //@ts-ignore
    let newId = await channel.send({ embeds: [stock], content: `If a specific code is out of stock you will still be able to get it, however it will take more time.\nInterested in any codes? Make a ticket!` });
    newId = await newId.id
    const previousMessageId = await getLastId();

    if (previousMessageId) {
        //@ts-ignore
        const previousMessage = await channel.messages.fetch(previousMessageId);

        await previousMessage.delete()
    }
    // await newId;

    updateStockId(await newId)


}

export { updateStock as updateStock }
