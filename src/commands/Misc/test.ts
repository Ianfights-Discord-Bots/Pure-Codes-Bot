import { Command } from "../../lib/structures/Command";
import { ActionRowBuilder, Events, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export default new Command({
    name: 'menu',
    description: 'shows example menu',
    run: ({ interaction }) => {
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Test');

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("Input Codes")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

            const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(hobbiesInput);

            modal.addComponents(secondActionRow);

            interaction.showModal(modal);

    }


})