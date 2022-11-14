import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../lib/structures/Event";
import { ExtendedInteraction } from "../lib/typings/Command";

export default new Event("interactionCreate", (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        // await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({ content: "You have used a non existent command", ephemeral: true });

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});
