import { createInvoice } from "../../../lib/coinbaseCommerce/createInvoice";
import { getPrice } from "../../../lib/db/priceManagement/getPrice";
import { getStock } from "../../../lib/db/codeManagement/getStock";

export const autoInvoiceCreate = async (interaction) => {
    const amount = interaction.fields.fields.get('amount').value;
    const email = interaction.fields.fields.get('email').value;

    if(await getStock() < amount) {
        interaction.reply({content: `Error! You asked for ${amount} codes while there are only ${await getStock()} codes currently in stock!`, ephemeral: true});
        return;
    }

    const invoice = createInvoice(email, `${interaction.user.username}`, `${amount}x14 Day Membership Codes`, { amount: await getPrice() * parseInt(amount), currency: "USD" }, 'eaf33f0e-28a3-4d48-bd8f-6a32551f7efd', interaction, true);

}