import { EmbedBuilder, Permissions, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Util } from "oldschooljs";
import { codeLength } from "./paymentMethods";
import { client } from "../../../index";
import { readJson } from "../../../util/readJson";
import { trunc } from "../../../util/trunc";
let guildId = process.env.guildId;

function openTicket(interaction) {
    try {
        client.guilds.cache.get(guildId).channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '997585322856681533',
            permissionOverwrites: [
                {
                    id: guildId,
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                },
                {
                    // Bot role
                    id: '997580635357069365',
                    allow: [PermissionFlagsBits.ViewChannel]
                }
            ],
        }).then(m => {
            // client.channels.cache.get(m.id).setParent(915131351592755212)
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticketClose_${interaction.user.username}`)
                        .setLabel('Close Ticket')
                        .setStyle(ButtonStyle.Danger),
                )
            //@ts-ignore
            client.channels.cache.get(m.id).send({ content: `Welcome <@${interaction.user.id}> , thank you for choosing Pure Codes! One of the <@&997585123430113310> will be with you soon`, components: [row] });



            const invoice = new EmbedBuilder()
                .setColor('#46bdf0')
                .setTitle('Code Prices');

            readJson('./codes.json', (err, codes) => {
                let length = 16
                let gpPrice = codes.gpPrice
                let codePrices = codes.prices
                invoice.addFields(
                    { name: `14 Day`, value: `Crypto $${'```'}${trunc((codePrices[`${length}_day`]))} ${'```'}` },
                    { name: `<:BTC:1048041691002716301> Bitcoin`, value: `${'```'}${codes.paymentMethods.btcAdress}${'```'}` },
                    { name: `<:LTC:1048042360929517568> Litecoin`, value: `${'```'}${codes.paymentMethods.ltcAddress}${'```'}` },
                    { name: `<:ETH:1048042120889507940> Ethereum`, value: `${'```'}${codes.paymentMethods.ethAddress}${'```'}` },
                    { name: `<:USDT:1048041928916221952> Tether`, value: `${'```'}${codes.paymentMethods.usdtAddress}${'```'}` }
                );
                //@ts-ignore
                client.channels.cache.get(m.id).send({ embeds: [invoice] })
            })

            codeLength(interaction, client);

        });
    } catch (e) {
        interaction.reply('An Error occured please tell staff what you would like.')

    }
}

export { openTicket as openMembershipTicket }