import { MessageEmbed } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { readJson } from "../../util/readJson";

export default new Command({
    name: 'stock',
    description: 'Allows you to see our current stock',
    run: ({ interaction }) => {
        readJson('./codes.json', (err, iCodes) => {
            let codes = iCodes.codes.unused;

            const error = new MessageEmbed()
                .setColor('#46bdf0')
                .setTitle('Stock')
                .setDescription(`14 Day: **${codes['16_days'].length}**`)

            interaction.reply({ embeds: [error] });
        });
    },
})