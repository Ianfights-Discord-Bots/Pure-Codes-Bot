import { PermissionFlagsBits, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, IntegrationApplication, ButtonBuilder, ButtonStyle } from "discord.js";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'auto-buy-button',
    description: 'Creates the button for the crypto auto purchase',
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`autoBuyCreate`)
                    .setLabel('Purchase Codes')
                    .setStyle(ButtonStyle.Success),
            )
        //@ts-ignore
        interaction.channel.send({ content: 'Click the button below to purchase codes automatically!', components: [row] })

        // const modal = new ModalBuilder()
        //     .setCustomId('cryptoAutoBuy')
        //     .setTitle('Upload Codes');

        // const codeInput = new TextInputBuilder()
        //     .setCustomId('amount')
        //     .setLabel("Number of codes desired")
        //     .setStyle(TextInputStyle.Short)
        //     .setRequired(true);


        // const firstActionRow = new ActionRowBuilder().addComponents(codeInput);


        // //@ts-ignore
        // modal.addComponents(firstActionRow);
        // interaction.showModal(modal);

    }
});