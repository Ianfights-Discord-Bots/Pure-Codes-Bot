import { CommandInteractionOptionResolver, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";
import { client } from "..";
import { Event } from "../lib/structures/Event";
import { ExtendedInteraction } from "../lib/typings/Command";
import { click } from "./cryptoClick/click";
import { openMembershipTicket } from "./ticketCreations/membership/membershipTicket";

export default new Event("interactionCreate", (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        // await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({ content: "You have used a non existent command", ephemeral: true });

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    } else if (interaction.isButton() || interaction.isAnySelectMenu()) {
        //@ts-ignore
        switch (interaction.customId) {
            case 'ticketSelect':
                //@ts-ignore
                switch(interaction.values[0]){
                    case 'membershipCodes':
                        openMembershipTicket(interaction)
                        break;
                }
                break;

            case 'deleteTicket':
                interaction.channel.delete();
                break;
            case 'cryptoBuy':
                click(interaction);
                break;
        }
        if (interaction.customId.includes('ticketClose', 0)) {
            let user = interaction.customId.replace('ticketClose_', '');
            //@ts-ignore
            interaction.channel.permissionOverwrites.set([
                {
                    id: process.env.guildId,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                // {
                //     id: hostId,
                //     allow: [Permissions.FLAGS.VIEW_CHANNEL]
                // },
                // {
                //     id: '923825468015276033',
                //     allow: [Permissions.FLAGS.VIEW_CHANNEL]
                // }
            ]);
            //@ts-ignore
            interaction.channel.setParent('997628545700479076')
            //@ts-ignore
            interaction.channel.setName(`closedTicket_${user}`)

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('deleteTicket')
                        .setLabel('Delete Ticket')
                        .setStyle(ButtonStyle.Danger),
                );
            //@ts-ignore
            client.channels.cache.get(interaction.channel.id).send({ content: 'Click the button below to delete this ticket', components: [row] });
            interaction.deferUpdate();

        }

    }
});
