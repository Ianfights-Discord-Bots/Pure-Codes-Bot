import { EmbedBuilder } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { choices } from "../../util/choices";
import { readJson } from "../../util/readJson";
import { trunc } from "../../util/trunc";
import { Util } from "oldschooljs";
import { getPrice } from "../../lib/db/priceManagement/getPrice";

export default new Command({
    name: 'prices',
    description: 'Shows you the current prices for codes.',

    run: async ({ interaction }) => {

        const invoice = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Code Prices');


        invoice.addFields({ name: `14 Day`, value: `Crypto $${'```'}${trunc((await getPrice()))} ${'```'}` });


        // .addField('16 Day', `Crypto $${'```'}${trunc(codePrices[`${codeLengths[i]}_day`] / 2.5)} ${'```'} \nGP ${'```'} ${Util.toKMB(codePrices[`${codeLengths[i]}_day`] / gpPrice * 1000000 / 2.5)} ${'```'} \nCashApp/PayPal  $${'```'} ${trunc(codePrices[`${codeLengths[i]}_day`] * cashAppMultiplier / 2.5)} ${'```'}`, true)





        interaction.reply({ embeds: [invoice] })

    }
})