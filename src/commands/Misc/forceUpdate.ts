import { PermissionFlagsBits, Permissions } from "discord.js";
import { updateStock } from "../../jobs/updateStock";
import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'force-update',
    description: 'Forces the stock message to refresh',
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        updateStock();
    }
})