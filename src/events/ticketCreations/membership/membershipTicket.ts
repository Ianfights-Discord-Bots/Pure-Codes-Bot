import { MessageActionRow, MessageButton, MessageEmbed, Permissions } from "discord.js";
import { Util } from "oldschooljs";
import { codeLength } from "./paymentMethods";
import { client } from "../../../index";
import { readJson } from "../../../util/readJson";
import { trunc } from "../../../util/trunc";
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
            client.channels.cache.get(m.id).send({ content: `Welcome <@${interaction.user.id}> , thank you for choosing Pure Codes! One of the <@&997585123430113310> will be with you soon`, components: [row] });



            const invoice = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle('Code Prices');

            readJson('./codes.json', (err, codes) => {
                let length = 16
                let gpPrice = codes.gpPrice
                let codePrices = codes.prices
                invoice.addField(`14 Day`, `Crypto $${'```'}${trunc((codePrices[`${length}_day`]))} ${'```'}`);
                invoice.addField(`<:BTC:1048041691002716301> Bitcoin`,`${'```'}${codes.paymentMethods.btcAdress}${'```'}`);
                invoice.addField(`<:LTC:1048042360929517568> Litecoin`,`${'```'}${codes.paymentMethods.ltcAddress}${'```'}`);
                invoice.addField(`<:ETH:1048042120889507940> Ethereum`,`${'```'}${codes.paymentMethods.ethAddress}${'```'}`);
                invoice.addField(`<:USDT:1048041928916221952> Tether`,`${'```'}${codes.paymentMethods.usdtAddress}${'```'}`);
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