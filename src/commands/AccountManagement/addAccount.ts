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
            name: 'username',
            description: 'The username for the account',
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
        {
            name: 'bank-pin',
            description: 'The bank pin for the account',
            type: ApplicationCommandOptionType.Number,
            required: false
        },
        {
            name: 'linked-email',
            description: 'The email linked to the account if applicable',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const email = interaction.options.get('email').value;
        const username = interaction.options.get('username').value;
        const password = interaction.options.get('password').value;
        const price = interaction.options.get('price').value;
        const description = interaction.options.get('description').value;
        const type = interaction.options.get('type').value ? interaction.options.get('type').value : undefined;
        const pin = interaction.options.get('bank-pin').value ? interaction.options.get('bank-pin').value: undefined;
        const linkedEmail = interaction.options.get('linked-email').value ? interaction.options.get('linked-email').value: undefined;


        //@ts-ignore
        addAccount(email, username, password, price, type, description, pin, linkedEmail)
        interaction.reply({content: 'Sucessfully added an account to the database!', ephemeral: true})

    }
});