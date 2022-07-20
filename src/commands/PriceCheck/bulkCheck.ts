import { MessageEmbed } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
import { trunc } from "../../util/trunc";
import { Util } from "oldschooljs";
import { choices } from "../../util/choices";

export default new Command({
    name: 'bulk-price',
    description: 'Checks the total price for bulk codes',
    options: [
        {
            name: 'length',
            description: 'The code length you want to buy.',
            type: 'INTEGER',
            required: true,
            choices: choices
        },
        {
            name: 'amount',
            description: 'The amount of the specified length of code you wish to buy.',
            type: 'INTEGER',
            required: true
        }
    ],
    run: ({ interaction }) => {
        readJson('./codes.json', (err, iCodes) => {
            const codePrices = iCodes.prices
            const gpPrice = iCodes.gpPrice
            const length = interaction.options.get('length').value;
            //@ts-ignore
            const amount: number = interaction.options.get('amount').value;


            const error = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle(`Bulk ${length} day codes`)
                .setDescription(`${amount} ${length} day codes will cost the following ammounts\nCrypto ${'```'}$${trunc((codePrices[`${length}_day`] * amount))} ${'```'}\nGP${'```'}${Util.toKMB((codePrices[`${length}_day`] * amount) * gpPrice * 10000000)} ${'```'}`)

            interaction.reply({ embeds: [error] });

        });
    }
})