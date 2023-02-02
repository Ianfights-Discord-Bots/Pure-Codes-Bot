import { Permissions, ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";
import { updatePrices } from "../../lib/db/priceManagement/updatePrices";
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
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only erver owners may run this command!", ephemeral: true })
            return;
        }
        //@ts-ignore
        const price: number = interaction.options.get('price').value;


        updatePrices(price)
        interaction.reply({ content: `Sucessfully updated the price for codes to ${price}`, ephemeral: true })


    }
})