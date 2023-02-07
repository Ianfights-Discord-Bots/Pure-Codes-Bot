import { EmbedBuilder, Permissions, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Util } from "oldschooljs";
import { client } from "../../../index";
import { readJson } from "../../../util/readJson";
import { trunc } from "../../../util/trunc";
import { getPrice } from "../../../lib/db/priceManagement/getPrice";
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
        }).then(async (m) => {
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
                .setTitle('Code Price & Terms of Service')
                .setFooter({text: 'For a more in-depth TOS please see #terms-of-service'});


            // invoice.addFields(
            //     { name: `14 Day`, value: `Crypto $${'```'}${trunc((await getPrice[`${length}_day`]))} ${'```'}` },
            //     { name: `<:BTC:1048041691002716301> Bitcoin`, value: `${'```'}${codes.paymentMethods.btcAdress}${'```'}` },
            //     { name: `<:LTC:1048042360929517568> Litecoin`, value: `${'```'}${codes.paymentMethods.ltcAddress}${'```'}` },
            //     { name: `<:ETH:1048042120889507940> Ethereum`, value: `${'```'}${codes.paymentMethods.ethAddress}${'```'}` },
            //     { name: `<:USDT:1048041928916221952> Tether`, value: `${'```'}${codes.paymentMethods.usdtAddress}${'```'}` }
            // );

            invoice.addFields(
                { name: '14 Day', value: `Crypto/Cash ${'```'}$${trunc(await getPrice())}${'```'}`},
                { name: 'Terms Of Service', value: `${'```'}1. All codes are checked before sale\n2. While codes do not expire, we reccomend using them within 2 months to reduce the possibility of losing the code\n3. It is your responsibility to keep track of your codes\n4. Refunds are not offered unless a code has been previously claimed${'```'}`}
            )
            //@ts-ignore
            client.channels.cache.get(m.id).send({ embeds: [invoice] })



        });
    } catch (e) {
        interaction.reply('An Error occured please tell staff what you would like.')

    }
}

export { openTicket as openMembershipTicket }