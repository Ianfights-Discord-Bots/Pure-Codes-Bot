import { EmbedBuilder, Permissions, ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { client } from "../..";
import { Command } from "../../lib/structures/Command";
import { log } from "../../util/log";
import { trunc } from "../../util/trunc";
import { getStock } from "../../lib/db/codeManagement/getStock";
import { getPrice } from "../../lib/db/priceManagement/getPrice";
import { removeCode } from "../../lib/db/codeManagement/removeCode";
import { updateUser } from "../../lib/db/userManagement/updateUsers";
import { addTransaction } from "../../lib/db/transactionManagement/addTransaction";

// ADMIN ONLY

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
                    name: 'Cash',
                    value: 'cash'
                },
                {
                    name: 'Giveaway',
                    value: 'giveaway'
                }
            ],
            required: true
        },
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }



        const user = interaction.options.get('user').value;
        //@ts-ignore
        const amount: number = interaction.options.get('amount').value;
        const paymentMethod = interaction.options.get('payment-method').value;
        //@ts-ignore
        const clientUser = client.users.cache.get(user);
        //@ts-ignore
        const clientUsername = client.users.cache.get(user).username
        const handlingTransactionUsername = interaction.user.username;


        const codes = await removeCode(amount);


        const noCodesError = new EmbedBuilder()
            .setColor('#ff0011')
            .setTitle('Error')
            .setDescription(`Error. There are no more 14 day codes left`);


        const notEnoughCodesError = new EmbedBuilder()
            .setColor('#ff0011')
            .setTitle('Error')
            .setDescription(`Error. There are not enough 14 day codes to fulfill this order. You asked for ${amount} while there are only ${await getStock()} available.`);

        if (codes == "Not Enough Codes") {
            interaction.reply({ embeds: [notEnoughCodesError] });
            return;
        }

        const invoice = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Purchase Info');

        switch (paymentMethod) {
            case 'cash':                                                            //@ts-ignore
                invoice.setDescription(`Payment Method: **Cash**\nPrice ${'```'}$${trunc((await getPrice())) * (amount)}${'```'} \nCustomer ${'```'}${clientUsername} ${'```'} \nEmployee${'```'}${handlingTransactionUsername} ${'```'}`)
                break;
            case 'giveaway':
                invoice.setDescription(`Congrats! You have won a giveaway for a 14 day code. \n`)
                break;
        }


        invoice.addFields({ name: 'Code Length', value: `${'```'}14 days${'```'}` });
        // codes.map((data) => {
            // invoice.addFields({ name: 'Code Value', value: `${'```'}${data}${'```'}` });

        // });

        for(let i in codes){
            addTransaction(clientUsername, codes[i], await getPrice());
            invoice.addFields({ name: 'Code Value', value: `${'```'}${codes[i]}${'```'}` });

        }

        let interactionAuthor = interaction.user
        // Send to interactions author dm's and the user pinged

        interactionAuthor.send({ embeds: [invoice] })
        clientUser.send({ embeds: [invoice] })
        clientUser.send(`To redeem your code, please go to https://www.runescape.com/store_locator and press "Activate Card". \nYou will be redirected to Runescape Login page, enter your credentials.\nYou'll be seeing something like "Redeem a Pre-Paid Card", just enter the code you received and that's it.`)

        //@ts-ignore

        // Send it to the receipts channel
        interaction.guild.channels.cache.get('849839901108469771').send({ embeds: [invoice] })


        interaction.reply(`Thank you <@${user}> for purchasing from us. If you could leave us some <#997580908896997447> and on [Our Sythe](https://www.sythe.org/threads/chimps-accounts-services-vouches). If you have any questions about the code please message any of the <@&997585123430113310> for help. We look forward to welcoming you again soon.\nYou order receipt along with the membership codes will be sent via DM to you now.`);

        const now = new Date();
        // log(`Employee Username: ${interactionAuthor.username}#${interactionAuthor.discriminator}\nCustomer Username: ${clientUsername}#${clientUser.discriminator}\nUUID: ${clientUser.id}\nCode: ${usedCode}\nLength: ${length}\nDate: ${now}\nCrypto Price: ${trunc(info.prices[`${length}_day`])}\nMethod: ${paymentMethod}\n\n`)

        //@ts-ignore
        updateUser(user, {purchaseType: 'Code', quantity: amount, pricePerUnit: await getPrice(), totalPurchaseAmount: await getPrice() * amount, employee: interactionAuthor.id, now})

    }
})