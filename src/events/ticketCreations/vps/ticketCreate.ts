import { MessageActionRow, MessageButton, MessageEmbed, Permissions } from "discord.js";
import { client } from "../../../index";
let guildId = process.env.guildId;

function openTicket(interaction) {
    try {
        client.guilds.cache.get(guildId).channels.create(`vps-ticket-${interaction.user.username}`, {
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

                const priceList = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle('VPS Prices')
                .addField(`**Operating Systems**`,`

                    • Windows 10
                    • Windows Server:
                    • 2012
                    • 2016
                    • 2019
                    • 2022`)
                    .addField(`**Prices*`,``);


            //@ts-ignore
            // client.channels.cache.get(m.id).send({content: "```Operating Systems: \nWindows 10 \nWindows Server: \n    2012 \n  2016 \n    2019 \n    2022```"})

            //@ts-ignore
            client.channels.cache.get(m.id).send({ content: `Welcome <@${interaction.user.id}> , thank you for choosing Chimp's Pure Bot Supplies! Please let an <@&997585123430113310> know what you would like!`, components: [row], embeds: [priceList] });

        });
    } catch (e) {
        interaction.reply('An Error occured please tell staff what you would like.')

    }
}

export { openTicket as openVpsTicket }