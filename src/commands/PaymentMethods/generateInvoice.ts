import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { createInvoice } from "../../lib/coinbaseCommerce/createInvoice";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'generate-invoice',
    description: 'Generated a Coinbase Commerce invoice.',
    options: [
        {
            name: 'name',
            description: 'The name of the user you are generating the invoice for',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'memo',
            description: 'The memo for the invoice',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'price',
            description: 'The price for the invoice in USD',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only erver owners may run this command!", ephemeral: true })
            return;
        }

        const name = interaction.options.get('name').value;
        const memo = interaction.options.get('memo').value;
        const price = interaction.options.get('price').value;
        //@ts-ignore
        const invoice = createInvoice('ianfights@gmail.com', `${name}`, `${memo}`, { amount: price, currency: "USD" }, 'eaf33f0e-28a3-4d48-bd8f-6a32551f7efd', interaction)


    }
})