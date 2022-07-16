import { Command } from "../../lib/structures/Command";
import { client } from "../..";
import { MessageActionRow, MessageButton, Permissions } from "discord.js";
// ADMIN ONLY
export default new Command({
    name: 'create-button',
    description: 'Creates the button for the tickets',
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
        //@ts-ignore
        // const type: string = interaction.options.get('type').value;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('membershipTicketCreate')
                    .setLabel('Create Membership Ticket')
                    .setStyle('PRIMARY'),
            );
        // interaction.reply({ content: 'Create a ticket by pressing the button below.', components: [row] });
        //@ts-ignore
        client.channels.cache.get(channelId).send({ content: 'Welcome, please press "Create Ticket" to order your cheap Runescape membership', components: [row] });
        interaction.reply({ content: 'Sucessfully created the button', ephemeral: true });
    }
})