import { Permissions } from "discord.js";
import { Command } from "../../lib/structures/Command";
import { choices } from "../../util/choices";
import { readJson } from "../../util/readJson";
// ADMIN ONLY

const prettier = require("prettier");
const fs = require("fs")

export default new Command({
    name: 'add',
    description: 'Adds codes to the database',
    options: [
        {
            name: 'code-value',
            description: 'The actual code that the user needs.',
            type: 'STRING',
            required:true
        }
    ],
    run: ({ interaction }) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            interaction.reply({ content: "Error! Only server owners may run this command!", ephemeral: true })
            return;
        }

        readJson('./codes.json', (err, iCodes) => {
            let codes = iCodes.codes.unused;

            const length = 16
            let codeData = interaction.options.get('code-value').value;

            switch (length) {
                case 16:
                    codes['16_days'].push(codeData)
                    break;
            }

            let finalCodes = iCodes;
            delete finalCodes.codes.unused;
            finalCodes.codes.unused = codes
            finalCodes = JSON.stringify(finalCodes);

            prettier.format(finalCodes, { parser: "json" })
            fs.writeFileSync('./codes.json', finalCodes);

            interaction.reply({content: 'Sucessfully added a new code to the database!', ephemeral: true})
        });
    }
})