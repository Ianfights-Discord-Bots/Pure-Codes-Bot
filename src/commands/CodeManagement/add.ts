import { ApplicationCommandOptionType, PermissionFlagsBits, Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { choices } from "../../util/choices";
import { readJson } from "../../util/readJson";
import { addCodes } from "../../lib/db/codeManagement/addCode";
// ADMIN ONLY

const prettier = require("prettier");
const fs = require("fs")

export default new Command({
    name: 'add',
    description: 'Adds codes to the database',
    options: [
        {
            name: 'code-value',
            description: 'The actual code that the user needs.',
            type: ApplicationCommandOptionType.String,
            required:true
        },
        {
            name: 'price-purchased',
            description: 'The price the code was purchased for in GP',
            type: ApplicationCommandOptionType.String,
            required:true
        },
        {
            name: 'gp-rate',
            description: 'The price paid for the gp in $/M',
            type: ApplicationCommandOptionType.String,
            required:true
        }
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const codeData = interaction.options.get('code-value').value;
        const pricePurchased = interaction.options.get('price-purchased').value;
        const gpRate = interaction.options.get('gp-rate').value;

        try{
        //@ts-ignore
        addCodes(codeData, pricePurchased, gpRate);
        } catch (err) {
            interaction.reply({content: "An Error occured! Please try again!", ephemeral: true})
        }
        
    }
})