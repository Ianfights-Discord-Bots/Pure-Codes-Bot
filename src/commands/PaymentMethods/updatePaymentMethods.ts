import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
const fs = require("fs");
const choices = [
    {
        name: 'Namer',
        value: '16'
    },
    {
        name: 'GP',
        value: 'GP'
    }
]

export default new Command({
    name: 'update-payment-methods',
    description: 'Updates the pricing in the database.',
    options:
        [
            {
                name: 'method',
                description: 'The payment method which you want to change',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'BTC',
                        value: 'btcAdress'
                    },
                    {
                        name: 'LTC',
                        value: 'ltcAdress'
                    },
                    {
                        name: 'ETH',
                        value: 'ethAdress'
                    },
                    {
                        name: 'USDT',
                        value: 'usdtAdress'
                    }
                ],
            },
            {
                name: 'value',
                description: 'The value you wish to change the method to',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only erver owners may run this command!", ephemeral: true })
            return;
        }


        readJson('./codes.json', (err, codes) => {
            const option = interaction.options.get('method').value;
            const data = interaction.options.get('value').value;
            console.log(codes.paymentMethods);
            console.log(option, data)

            //@ts-ignore
            codes.paymentMethods[option] = data;



            console.log(codes.paymentMethods);

            fs.writeFileSync('./codes.json', JSON.stringify(codes));
        });
    },
})