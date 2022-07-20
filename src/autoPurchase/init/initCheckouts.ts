import { readJson } from "../../util/readJson";
import * as coinbase from 'coinbase-commerce-node';
import * as fs from 'fs'

const Checkout = coinbase.resources.Checkout;
const checkoutIds = []

export const initCheckouts = () => {
    readJson('./codes.json', async (err, pricing) => {
        readJson('./checkouts.json', (err, iCheckouts) => {
            let a = 0;
            for (let i in pricing.prices) {
                // Get the length of the code as the json dict is in
                // length_day
            
                let codeLength: string = i.split('_')[0];
                //@ts-ignore

                var checkoutData = {
                    'name': `${codeLength} Day Membership Code`,
                    'description': `Gives your account membership for ${codeLength} days. In the name field please just put your discord username and tag I.E. ianfights#9796`,
                    'pricing_type': 'fixed_price',
                    'local_price': {
                        'amount': pricing.prices[i],
                        'currency': 'USD'
                    },
                    'limit:':`${pricing.codes.unused[`${codeLength}_days`].length}`,
                    'requested_info': ['name']
                };
                Checkout.create(checkoutData, async function (error, res) {
                    if (error) { throw error }
                    console.log(await res.id)
                    let finalCheckouts = iCheckouts;
                    finalCheckouts.checkouts.push(await res.id)
                    finalCheckouts.order.push({[codeLength]:a})
                    finalCheckouts = JSON.stringify(finalCheckouts)
                    console.log(finalCheckouts)
                    fs.writeFileSync('./checkouts.json', finalCheckouts)
                    a++;
                });
            }

        });


    });

    // var checkoutData = {
    //     'name': 'The Sovereign Individual',
    //     'description': 'Mastering the Transition to the Information Age',
    //     'pricing_type': 'fixed_price',
    //     'local_price': {
    //         'amount': '100.00',
    //         'currency': 'USD'
    //     },
    //     'requested_info': ['name', 'email']
    // };
    // Checkout.create(checkoutData, function (error, response) {
    //     console.log(error);
    //     console.log(response);
    // });
}