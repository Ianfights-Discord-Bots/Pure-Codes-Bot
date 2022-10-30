import { Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
const fs = require("fs");
const choices = [
    {
        name: '14 Day',
        value: '16'
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
            const option: string = '16'
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