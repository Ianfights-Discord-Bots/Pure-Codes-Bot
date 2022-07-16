import { MessageActionRow, MessageButton, Permissions } from "discord.js";
import { codeLength } from "./paymentMethods";
import { client } from "../../../index";
let guildId = process.env.guildId;

function openTicket(interaction) {
    try {
        client.guilds.cache.get(guildId).channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: '997585322856681533',
            permissionOverwrites: [
                {
                    id: guildId,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: interaction.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    // Bot role
                    id: '997580635357069365',
                    allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ],
        }).then(m => {
            // client.channels.cache.get(m.id).setParent(915131351592755212)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`ticketClose_${interaction.user.username}`)
                        .setLabel('Close Ticket')
                        .setStyle('DANGER'),
                )
            //@ts-ignore
            client.channels.cache.get(m.id).send({ content: `Welcome <@${interaction.user.id}> , thank you for choosing Pure Codes. Please choose the length of membership and payment options and enter below and a member of <@&923825468015276033> will be with you soon`, components: [row] });

            const length = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('16')
                        .setLabel('16 Day')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('24')
                        .setLabel('24 Day')
                        .setStyle('SUCCESS'),

                    new MessageButton()
                        .setCustomId('40')
                        .setLabel('40 Day')
                        .setStyle('SECONDARY'),

                    new MessageButton()
                        .setCustomId('48')
                        .setLabel('48 Day')
                        .setStyle('DANGER')

                );

            const length2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('72')
                        .setLabel('72 Day')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('96')
                        .setLabel('96 Day')
                        .setStyle('SUCCESS'),

                    new MessageButton()
                        .setCustomId('144')
                        .setLabel('144 Day')
                        .setStyle('SECONDARY'),

                    new MessageButton()
                        .setCustomId('292')
                        .setLabel('292 Day')
                        .setStyle('DANGER'),


                );
            //@ts-ignore
            client.channels.cache.get(m.id).send({ content: 'Please choose the length of the code\n\nShort Codes', components: [length] });
            //@ts-ignore
            client.channels.cache.get(m.id).send({ content: 'Long Codes', components: [length2] })

            codeLength(interaction, client);

        });
    } catch (e) {
        interaction.reply('An Error occured please tell staff what you would like.')

    }
}

export { openTicket as openMembershipTicket }