import { readJson } from "../../../util/readJson";
import * as prettier from 'prettier';
import * as fs from 'fs'
import { addCodes } from "../../../lib/db/codeManagement/addCode";

export const addBulk = (interaction) => {
    //@ts-ignore
    const modalCodes = interaction.fields.fields.get('codes').value.split('\n');
    const pricePaid = interaction.fields.fields.get('price-per-code').value;
    const gpPrice = interaction.fields.fields.get('gp-price').value;

    for (let i in modalCodes) {
        addCodes(modalCodes[i], pricePaid, gpPrice)
    }

    interaction.reply({ content: `Sucessfully added ${modalCodes.length} new codes to the database!`, ephemeral: true })


} 