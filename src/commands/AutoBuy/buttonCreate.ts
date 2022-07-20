import { MessageButton, Permissions, MessageActionRow } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { client } from "../..";
import { createButtons } from "../../autoPurchase/createButtons";

export default new Command({
    name: 'button-create-crypto',
    description: 'Creates the button for the crypto buying system',
    options: [
        {
            name: 'channel',
            description: 'Specifies the channel for the button to be placed in.',
            type: 'CHANNEL',
            required: true
        }
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const channelId = interaction.options.get('channel').value;

        createButtons(channelId);
interaction.reply({content: 'Created crypto buttons', ephemeral: true});
    }
})