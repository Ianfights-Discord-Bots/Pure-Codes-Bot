import { Command } from "../../lib/structures/Command";
import { client } from "../..";
import { PermissionFlagsBits, ApplicationCommandOptionType, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
// ADMIN ONLY
export default new Command({
    name: 'create-button',
    description: 'Creates the button for the tickets',
    options: [
        {
            name: 'channel',
            description: 'Specifies the channel for the button to be placed in.',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('ticketSelect')
                    .setPlaceholder('Create Ticket')
                    .addOptions(
                        {
                            emoji: '<:OsrsBond:1048769128137248768>',
                            label: 'Membership Codes',
                            description: 'Click me if you want to make a ticket membership codes!',
                            value: 'membershipCodes',
                        },
                        {
                            emoji: '👤',
                            label: 'Accounts',
                            description: 'Click me if you want to make a ticket for account sales!',
                            value: 'accounts',
                        },
                        {
                            emoji: '<:OsrsGold:1048770125718880316>',
                            label: 'Gold',
                            description: 'Click me if you want to make a ticket for gold sales!',
                            value: 'gold',
                        },
                    ),
            );
        const channelId = interaction.options.get('channel').value;
        //@ts-ignore
        // const type: string = interaction.options.get('type').value;


        // interaction.reply({ content: 'Create a ticket by pressing the button below.', components: [row] });
        //@ts-ignore
        client.channels.cache.get(channelId).send({ content: 'Welcome, please press "Create Ticket" to create a ticket.', components: [row] });
        interaction.reply({ content: 'Sucessfully created the button', ephemeral: true });
    }
})