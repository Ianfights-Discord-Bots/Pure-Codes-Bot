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
            // The label is the prompt the user sees for this input
            .setLabel("Input each code on a new line")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
        //@ts-ignore
        modal.addComponents(firstActionRow);
        interaction.showModal(modal);

    }
});