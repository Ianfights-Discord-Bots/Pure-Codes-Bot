export const createInvoice = (businessName: string, customerEmail: string, customerName: string, memo: string, localPrice: { amount: number, currency: 'USD' | 'EUR' | 'GBP' }, apiKey: string) => {
    const fetch = require('node-fetch');

    const url = 'https://api.commerce.coinbase.com/invoices';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'X-CC-Api-Key': apiKey, 
            'X-CC-Version': '2018-03-22',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            local_price: localPrice,
            business_name: `${businessName}`,
            customer_email: `${customerEmail}`,
            customer_name: `${customerName}`,
            memo: `${memo}`
        })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}