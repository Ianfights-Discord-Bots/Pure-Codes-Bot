import axios from "axios";

export const createInvoice = async (
    customerEmail: string,
    customerName: string,
    memo: string,
    localPrice: { amount: number, currency: 'USD' | 'EUR' | 'GBP' },
    apiKey: string,
    interaction?,
    autoCreate?
) => {
    const data = JSON.stringify({
        local_price: localPrice,
        business_name: `Chimp's Accounts & Membership`,
        customer_email: `${customerEmail}`,
        customer_name: `${customerName}`,
        memo: `${memo}`
    });

    let config = {
        method: 'post',
        url: 'https://api.commerce.coinbase.com/invoices',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Api-Key': apiKey
        },
        data: data
    };

    axios(config)
        .then(async (response) => {
            console.log(response.data.data.code);
            if (interaction) {
                if (autoCreate) {
                    interaction.reply({ content: `Your invoice has been created! Please go to https://commerce.coinbase.com/invoices/${response.data.data.code} to pay!`, ephemeral: true })
                } else {
                    interaction.reply(`Your invoice has been created! Please go to https://commerce.coinbase.com/invoices/${response.data.data.code} to pay!`)
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}