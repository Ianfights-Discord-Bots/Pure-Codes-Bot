import { MessageEmbed } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { choices } from "../../util/choices";
import { readJson } from "../../util/readJson";
import { trunc } from "../../util/trunc";
import { Util } from "oldschooljs";
let codeLengths = [16, 24, 40, 48, 72, 96, 144, 292]

export default new Command({
    name: 'prices',
    description: 'Shows you the current prices for codes.',

    run: ({ interaction }) => {
        const codeLength = 16
        readJson('./codes.json', (err, info) => {
            const codePrices = info.prices;
            const gpPrice = info.gpPrice
            const invoice = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle('Code Prices');


            invoice.addField(`14 Day`, `Crypto $${'```'}${trunc((codePrices[`${codeLength}_day`]))} ${'```'} \nGP ${'```'} ${Util.toKMB(codePrices[`${codeLength}_day`] * gpPrice * 10000000)} ${'```'}`, true)


            // .addField('16 Day', `Crypto $${'```'}${trunc(codePrices[`${codeLengths[i]}_day`] / 2.5)} ${'```'} \nGP ${'```'} ${Util.toKMB(codePrices[`${codeLengths[i]}_day`] / gpPrice * 1000000 / 2.5)} ${'```'} \nCashApp/PayPal  $${'```'} ${trunc(codePrices[`${codeLengths[i]}_day`] * cashAppMultiplier / 2.5)} ${'```'}`, true)





            interaction.reply({ embeds: [invoice] })
        });
    }
})