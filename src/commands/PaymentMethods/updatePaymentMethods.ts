import { Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
//ADMIN ONLY

const fs = require('fs');
export default new Command({
    name: 'update-payment-methods',
    description: 'Updates the payment methods in the database.',
    options: [
        {
            name: 'method',
            description: 'Sets which method you want to change.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'BTC Adress',
                    value: 'btcAdress'
                },
                {
                    name: 'BNB Adress',
                    value: 'bnbAdress'
                },
                {
                    name: 'Coinbase Adress',
                    value: 'coinbaseAdress'
                },
            ]
        },
        {
            name: 'data',
            description: 'Sets value to change the method to.',
            type: 'STRING',
            required: true
        }
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }
        readJson('./codes.json', (err, codes) => {
            const option = interaction.options.get('method').value;
            const data = interaction.options.get('data').value;
            console.log(data)

            //@ts-ignore
            codes.paymentMethods[option] = data;

            fs.writeFileSync('./codes.json', JSON.stringify(codes));
            interaction.reply({ content: `Sucessfully updated ${option} to  ${data}`, ephemeral: true });

        })


    }
});