import { PermissionFlagsBits, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, IntegrationApplication } from "discord.js";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'bulk-add',
    description: 'Adds the ability to bulk add codes',
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }


        const modal = new ModalBuilder()
            .setCustomId('bulkAdd')
            .setTitle('Upload Codes');

        const codeInput = new TextInputBuilder()
            .setCustomId('codes')
            .setLabel("Input each code on a new line")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            const priceInput = new TextInputBuilder()
            .setCustomId('price-per-code')
            .setLabel("Average price paid in M")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

            const gpPrice = new TextInputBuilder()
            .setCustomId('gp-price')
            .setLabel("Please the current gold price")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
        const se = new ActionRowBuilder().addComponents(priceInput);
        const th = new ActionRowBuilder().addComponents(gpPrice);


        //@ts-ignore
        modal.addComponents(firstActionRow,se,th);
        interaction.showModal(modal);

    }
});