import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import * as fs from 'fs';
import { client } from "..";
import { readJson } from "../util/readJson";
// 998665674933149816

export const createButtons = (channelId) => {
    readJson('./checkouts.json', async (err, checkouts) => {
        let codeValues = {
            16: '',
            24: '',
            40: '',
            48: '',
            72: '',
            96: '',
            144: '',
            292: ''
        }

        // Loop through each value in the oders array to find it

        for (let i in checkouts.order) {
            let length = JSON.stringify(checkouts.order[i]).split(':')[0].slice(1).replaceAll('"', '')
            let pos = JSON.stringify(checkouts.order[i]).split(':')[1].replace('}', '')
            // console.log(pos)
            codeValues[length] = parseInt(pos)

        }
        const length = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[16]]}`)
                    .setStyle('LINK')
                    .setLabel('16 Day'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[24]]}`)
                    .setLabel('24 Day')
                    .setStyle('LINK'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[40]]}`)
                    .setLabel('40 Day')
                    .setStyle('LINK'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[48]]}`)
                    .setLabel('48 Day')
                    .setStyle('LINK')
            );

        const length2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[72]]}`)
                    .setLabel('72 Day')
                    .setStyle('LINK'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[96]]}`)
                    .setLabel('96 Day')
                    .setStyle('LINK'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[144]]}`)
                    .setLabel('144 Day')
                    .setStyle('LINK'),

                new MessageButton()
                    .setURL(`https://commerce.coinbase.com/checkout/${checkouts.checkouts[codeValues[292]]}`)
                    .setLabel('292 Day')
                    .setStyle('LINK'),
            );
        readJson('./config.json', async (err, config) => {
            //@ts-ignore
            let oldShort = await client.channels.cache.get(channelId).messages.fetch(config.crypto.short)
            //@ts-ignore
            let oldLong = await client.channels.cache.get(channelId).messages.fetch(config.crypto.long)

            if(oldShort || oldLong){
                oldShort.delete();
                oldLong.delete();
            }


            const tagMessage = new MessageEmbed()
            .setColor('#46bdf0')
            .setTitle('Crypto Auto Pay')
            .setDescription(`Are you tired of having to talk to a person or wait to purchase a code? Well wait no longer! Just click one of the buttons below and follow send any of the accepted currencies to the adress listed and you will automatically receive your code!`);
            //@ts-ignore
            // client.channels.cache.get(channelId).send({ embeds: [tagMessage] })

            //@ts-ignore
            let shortId = await client.channels.cache.get(channelId).send({ components: [length], content: 'Short Codes' })
            //@ts-ignore
            let longId =await client.channels.cache.get(channelId).send({ components: [length2], content: 'Long Codes' })

            config.crypto.short = await shortId.id
            config.crypto.long = await longId.id;

            let finalConfig = JSON.stringify(config);
            fs.writeFileSync('./config.json', finalConfig)
        });
    });
}