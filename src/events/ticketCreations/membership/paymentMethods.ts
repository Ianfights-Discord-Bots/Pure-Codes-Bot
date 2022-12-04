import {EmbedBuilder } from "discord.js";
import { Util } from 'oldschooljs';
import { readJson } from "../../../util/readJson";
import { trunc } from "../../../util/trunc";



export function codeLength(interaction, client) {
    if (!interaction.isButton()) return;

    client.once('interactionCreate', interaction => {
        if (!interaction.isButton()) return;

        if (isNaN(parseInt(interaction.customId))) {
            codeLength(interaction, client);
            return;
        }
        let length = interaction.customId;

        const invoice = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Code Prices');

        readJson('./codes.json', (err, codes) => {
            let gpPrice = codes.gpPrice
            let codePrices = codes.prices
            invoice.addFields(
                { name: `${length} Day`, value: `Crypto $${'```'}${trunc((codePrices[`${length}_day`]))} ${'```'} \nGP ${'```'} ${Util.toKMB(codePrices[`${length}_day`] * gpPrice * 10000000)} ${'```'}`, inline: true }
            )
            interaction.message.channel.send({ embeds: [invoice] })
        })

        interaction.deferUpdate()
    });
}

