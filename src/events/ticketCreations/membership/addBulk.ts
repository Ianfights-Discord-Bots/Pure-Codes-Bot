import { readJson } from "../../../util/readJson";
import * as prettier from 'prettier';
import * as fs from 'fs'

export const addBulk = (interaction) => {
    //@ts-ignore
    const modalCodes = interaction.fields.fields.get('codes').value.split('\n');
    readJson('./codes.json', (err, iCodes) => {
        let codes = iCodes.codes.unused;
        for (let i in modalCodes) {

            console.log(modalCodes[i])
            const length = 16
            let codeData = modalCodes[i];

            switch (length) {
                case 16:
                    codes['16_days'].push(codeData)
                    break;
            }




        }
        let finalCodes = iCodes;

        delete finalCodes.codes.unused;
        finalCodes.codes.unused = codes
        finalCodes = JSON.stringify(finalCodes);
        prettier.format(finalCodes, { parser: "json" })
        fs.writeFileSync('./codes.json', finalCodes);
        interaction.reply({ content: `Sucessfully added ${modalCodes.length} new codes to the database!`, ephemeral: true })

    });
} 