import { EmbedBuilder } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { getStock } from "../../lib/db/codeManagement/getStock";

export default new Command({
    name: 'stock',
    description: 'Allows you to see our current stock',
    run: async ({ interaction }) => {

        const error = new EmbedBuilder()
            .setColor('#46bdf0')
            .setTitle('Stock')
            .setDescription(`14 Day: **${await getStock()}**`)

        interaction.reply({ embeds: [error] });

    },
})