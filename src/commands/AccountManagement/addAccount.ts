import { PermissionFlagsBits, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { addAccount } from "../../lib/db/accountManagement/addAccount";

export default new Command({
    name: 'add-account',
    description: 'Adds an account to the database for sale',
    options: [
        {
            name: 'email',
            description: 'The email you login to the account with',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'password',
            description: 'The password for the account',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'price',
            description: 'The price to sell the account for in USD',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'description',
            description: 'Any extra details for the account',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'type',
            description: 'The type of the account',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const email = interaction.options.get('email').value;
        const password = interaction.options.get('password').value;
        const price = interaction.options.get('price').value;
        const description = interaction.options.get('description').value;
        const type = interaction.options.get('type').value ? interaction.options.get('type').value : undefined;


        //@ts-ignore
        addAccount(email, password, price, type, description)
        interaction.reply({content: 'Sucessfully added an account to the database!', ephemeral: true})

    }
});