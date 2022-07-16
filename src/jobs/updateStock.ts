import { MessageEmbed } from 'discord.js';
import { client } from '..';
import * as fs from 'fs';
import { readJson } from '../util/readJson';


const channelId = process.env.channelId;

const updateStock = async () => {
    readJson('./config.json', (err, info) => {
        readJson('./codes.json', async (err, iCodes) => {
            let codes = iCodes.codes.unused;

            const previousMessageId = info['last-stock-id'];

            const channel = await client.channels.cache.get(channelId)
            //@ts-ignore
            const previousMessage = await channel.messages.fetch(previousMessageId);

            const stock = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle('Stock')
                .setDescription(`16 Day: **${codes['16_days'].length}** \n24 Day: **${codes['24_days'].length}** \n40 Day: **${codes['40_days'].length}**\n48 Day: **${codes['48_days'].length}**\n72 Day: **${codes['72_days'].length}**\n96 Day: **${codes['96_days'].length}** \n144 Day: **${codes['144_days'].length}** \n292 Day: **${codes['292_days'].length}**`)

            //@ts-ignore
            let newId = await channel.send({ embeds: [stock], content:`If a specific code is out of stock you will still be able to get it, however it will take more time.\nInterested in any codes? Make a ticket!`});
            newId = await newId.id

            await previousMessage.delete()

            let updatedMessage = info;
            updatedMessage['last-stock-id'] = await newId;
            updatedMessage = JSON.stringify(updatedMessage);

            fs.writeFileSync('./config.json', updatedMessage)
        });
    });
}

export { updateStock as updateStock }