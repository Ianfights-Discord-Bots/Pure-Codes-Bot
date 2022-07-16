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
                .setDescription(`16 Day: **${codes['16_days'].length}** \n24 Day: **${codes['24_days'].length}** \n40 Day: **${codes['40_days'].length}**\n48 Day: **${codes['48_days'].length}**\n72 Day: **${codes['72_days'].length}**\n96 Day: **${codes['96_days'].length}** \n144 Day: **${codes['144_days'].length}** \n292 Day: **${codes['292_days'].length}**`)

            interaction.reply({ embeds: [error] });
        });
    },
})