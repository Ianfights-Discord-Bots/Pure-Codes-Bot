import { PermissionFlagsBits, Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { removeCode } from "../../lib/db/codeManagement/removeCode";

export default new Command({
    name: 'tst',
    description: 'test',
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        removeCode(5)
    }
})