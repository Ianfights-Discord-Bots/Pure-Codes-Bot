import { EmbedBuilder, Permissions, ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { Util } from "oldschooljs";
import { client } from "../..";
import { Command } from "../../lib/structures/Command";
import { choices } from "../../util/choices";
import { log } from "../../util/log";
import { readJson } from "../../util/readJson";
import { trunc } from "../../util/trunc";

// ADMIN ONLY
const prettier = require("prettier");
const fs = require("fs");

export default new Command({
    name: 'complete',
    description: 'Completes a transaction and sends the code.',
    options: [
        {
            name: 'user',
            description: 'The user who purchased the codes',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'amount',
            description: 'The amount of codes the user wishes to buy',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'payment-method',
            description: 'The payment method the user is using',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Crypto',
                    value: 'crypto'
                },
                {
                    name: 'GP',
                    value: 'gp'
                },
                {
                    name: 'Giveaway',
                    value: 'giveaway'
                }
            ],
            required: true
        },
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }
        readJson('./codes.json', async (err, info) => {
            const codes = info.codes.unused;
            let usedCodes = info.codes.used;
            const user = interaction.options.get('user').value;
            const length = 16
            //@ts-ignore
            const amount: number = interaction.options.get('amount').value - 1;
            console.log(amount)
            const paymentMethod = interaction.options.get('payment-method').value;
            //@ts-ignore
            const clientUser = client.users.cache.get(user);
            //@ts-ignore
            const clientUsername = client.users.cache.get(user).username
            const handlingTransactionUsername = interaction.user.username;


            const noCodesError = new EmbedBuilder()
                .setColor('#ff0011')
                .setTitle('Error')
                .setDescription(`Error. There are no more 14 day codes left`);

            if (!codes[`${length}_days`][0]) { interaction.reply({ embeds: [noCodesError] }); return; }

            const notEnoughCodesError = new EmbedBuilder()
                .setColor('#ff0011')
                .setTitle('Error')
                .setDescription(`Error. There are not enough 14 day codes to fulfill this order. You asked for ${amount} while there are only ${codes[`${length}_days`].length} available.`);

            if (codes[`${length}_days`].length < amount) { interaction.reply({ embeds: [notEnoughCodesError] }); return; }


            const invoice = new EmbedBuilder()
                .setColor('#46bdf0')
                .setTitle('Purchase Info');

            switch (paymentMethod) {
                case 'crypto':
                    invoice.setDescription(`Payment Method: **Crypto**\nPrice ${'```'}$${trunc((info.prices[`${length}_day`])) * (amount + 1)}${'```'} \nCustomer ${'```'}${clientUsername} ${'```'} \nEmployee${'```'}${handlingTransactionUsername} ${'```'}`)
                    break;
                case 'gp':
                    invoice.setDescription(`Payment Method: **GP**\nPrice${'```'} ${Util.toKMB(((info.prices[`${length}_day`]) / info.gpPrice) * 1000000 * (amount + 1))} GP${'```'} \nCustomer ${'```'}${clientUsername} ${'```'} \nEmployee ${'```'}${handlingTransactionUsername} ${'```'}`)
                    break;
                case 'giveaway':
                    invoice.setDescription(`Congrats! You have won a giveaway for a 14 day code. \n`)
                    break;
            }

            //let usedCode = codes[`${length}_days`].shift();
            //usedCodes[`${length}_days`].push(usedCode)


            let usedCode = '';


            let codesForUser: Array<any> = []
            // Get the amount of codes the user asked for
            for (let i = 0; i <= amount; i++) {
                usedCode = '';
                usedCode = usedCode + codes[`${length}_days`].shift()
                usedCodes[`${length}_days`].push(usedCode)

                codesForUser.push(usedCode)
            }
            invoice.addFields({ name: 'Code Length', value: `${'```'}14 days${'```'}` });
            codesForUser.map((data) => {
                invoice.addFields({ name: 'Code Value', value: `${'```'}${data}${'```'}` });

            });

            let interactionAuthor = interaction.user
            // Send to interactions author dm's and the user pinged
            // method.message.channel.send({ embeds: [invoice] })

            interactionAuthor.send({ embeds: [invoice] })
            clientUser.send({ embeds: [invoice] })
            clientUser.send(`To redeem your code, please go to https://www.runescape.com/store_locator and press "Activate Card". \nYou will be redirected to Runescape Login page, enter your credentials.\nYou'll be seeing something like "Redeem a Pre-Paid Card", just enter the code you received and that's it.`)
            //Send it to Geek
            // interaction.guild.members.fetch(geekUserId).send({ embeds: [invoice] });
            //@ts-ignore
            // let geek = await client.guilds.cache.get(guildId).members.fetch(geekUserId)
            // geek.send({ embeds: [invoice] })

            // Send it to the receipts channel
            interaction.guild.channels.cache.get('997648000631439472').send({ embeds: [invoice] })


            //@ts-ignore
            interaction.reply(`Thank you <@${user}> for purchasing from us. If you could leave us some <#997580908896997447> and on [Our Sythe](https://www.sythe.org/threads/chimps-accounts-services-vouches). If you have any questions about the code please message any of the <@&997585123430113310> for help. We look forward to welcoming you again soon.\nYou order receipt along with the membership codes will be sent via DM to you now.`);


            let finalCodes = info;
            finalCodes.codes.unused = codes;
            finalCodes.codes.used = usedCodes;

            finalCodes = JSON.stringify(finalCodes);


            prettier.format(finalCodes, { parser: "json" })

            fs.writeFileSync('./codes.json', finalCodes);
            const now = new Date();
            log(`Employee Username: ${interactionAuthor.username}#${interactionAuthor.discriminator}\nCustomer Username: ${clientUsername}#${clientUser.discriminator}\nUUID: ${clientUser.id}\nCode: ${usedCode}\nLength: ${length}\nDate: ${now}\nCrypto Price: ${trunc(info.prices[`${length}_day`])}\nMethod: ${paymentMethod}\n\n`)

        });
    }
})