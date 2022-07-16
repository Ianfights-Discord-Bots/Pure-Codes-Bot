import { Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
const fs = require("fs");
const choices = [
    {
        name: '16 Day',
        value: '16'
    },
    {
        name: '24 Day',
        value: '24'
    },
    {
        name: '40 Day',
        value: '40'
    },
    {
        name: '48 Day',
        value: '48'
    },
    {
        name: '72 Day',
        value: '72'
    },
    {
        name: '96 Day',
        value: '96'
    },
    {
        name: '144 Day',
        value: '144'
    },
    {
        name: '292 Day',
        value: '292'
    },
    {
        name: 'GP',
        value: 'GP'
    }
]

export default new Command({
    name: 'update-prices',
    description: 'Updates the pricing in the database.',
    options:
        [
            {
                name: 'option',
                description: 'The option to change the price for.',
                type: 'STRING',
                required: true,
                choices: choices
            },
            {
                name: 'price',
                description: 'The price to change the specified option to.',
                type: 'NUMBER',
                required: true
            }
        ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            interaction.reply({ content: "Error! Only erver owners may run this command!", ephemeral: true })
            return;
        }
        readJson('./codes.json', (err, iCodes) => {
            if (err) throw err;
            let codes = iCodes;
            //@ts-ignore
            const option: string = interaction.options.get('option').value;
            //@ts-ignore
            const price: number = interaction.options.get('price').value;

            if (!isNaN(parseInt(option))) {
                // Update a code and not gp
                console.log(codes.prices);
                codes.prices[`${option}_day`] = price;
                console.log(codes.prices);
            } else {
                // Setting the price of GP.
                codes.gpPrice = price;
            }

            fs.writeFileSync('./codes.json', JSON.stringify(codes));
            interaction.reply({ content: `Sucessfully updated the price for ${isNaN(parseInt(option)) ? /* it is GP */ 'GP' : option + ' day codes'} to ${price}`, ephemeral: true })

        });
    }
})