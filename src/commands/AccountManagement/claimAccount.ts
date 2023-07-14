import { ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { client } from "../..";
import { Command } from "../../lib/structures/Command";
import { claimAccount } from "../../lib/db/accountManagement/claimAccount";
import { codeBlock } from "../../util/codeBlock";
import { openAccTicket } from "../../events/ticketCreations/account/accTicket";
import { addTransaction } from "../../lib/db/transactionManagement/addTransaction";
import { updateUser } from "../../lib/db/userManagement/updateUsers";

export default new Command({
    name: 'claim-account',
    description: 'Finalizes a purchase and send the account details to the customer',
    options: [
        {
            name: 'user',
            description: 'The user who purchased the codes',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'amount',
            description: 'The amount of accounts the user wishes to purchase',
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
        {
            name: 'account-type',
            description: 'The type of account the user is purchasing',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'price',
            description: 'The price the account is being sold at',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        const user = interaction.options.get('user').value;
        //@ts-ignore
        const amount: number = interaction.options.get('amount').value;
        //@ts-ignore
        const price: number = interaction.options.get('price').value;
        //@ts-ignore
        const accountType: string = interaction.options.get('account-type').value;
        const paymentMethod = interaction.options.get('payment-method').value;
        //@ts-ignore
        const clientUser = client.users.cache.get(user);
        //@ts-ignore
        const clientUsername = client.users.cache.get(user).username
        const handlingTransactionUsername = interaction.user.username;


        const accounts = await claimAccount(accountType, amount);

        const notEnoughStock = new EmbedBuilder()
            .setColor('#ff0011')
            .setTitle('Error')
            .setDescription(`Error. There are not enough ${accountType} accounts to fulfill the order`);

        if (await accounts == 'Not enough stock') {
            interaction.reply({ embeds: [notEnoughStock], ephemeral: true });
            return;
        }

        const invoice = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Purchase Info');

        const receipt = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Accounts');

        invoice.addFields(
            { name: `Price`, value: codeBlock(`$${price * amount}`) },
            { name: 'Amount', value: codeBlock(amount) },
            { name: `Price Per Unit`, value: codeBlock('$' + price) },
            { name: `Customer`, value: codeBlock(clientUsername) },
            { name: `Employee`, value: codeBlock(interaction.user.username) }
        )

        //@ts-ignore
        for (let i in accounts) {
            receipt.addFields(
                { name: `Email`, value: codeBlock(accounts[i].loginEmail) },
                { name: `Password`, value: codeBlock(accounts[i].password) },
                { name: `Account Type`, value: codeBlock(accountType) }
            );
            addTransaction(clientUsername, accounts[i].loginEmail, price, paymentMethod, 'Account')
        }


        // We need to break it into two seperate things so we can avoid the character limit
        clientUser.send({ embeds: [invoice] });
        clientUser.send({ embeds: [receipt] })
        //@ts-ignore
        // Send to the receipts channel
        interaction.guild.channels.cache.get('997648000631439472').send({ embeds: [invoice] });
        //@ts-ignore
        interaction.guild.channels.cache.get('997648000631439472').send({ embeds: [receipt] });


        interaction.reply(`Thank you <@${user}> for purchasing from us. If you could leave us some <#997580908896997447> and on [Our Sythe](https://www.sythe.org/threads/chimps-accounts-services-vouches). If you have any questions about the code please message any of the <@&997585123430113310> for help. We look forward to welcoming you again soon.\nYou order receipt along with the login details will be sent via DM to you now.`);
        const now = new Date();

        updateUser(`${user}`, { purchaseType: 'Account', quantity: amount, pricePerUnit: price, totalPurchaseAmount: price * amount, employee: interaction.user.username, date: now })
    }
});