const coinbase = require('coinbase-commerce-node');
const Checkout = coinbase.resources.Checkout;


export const click = (interaction) => {
    var checkoutData = {
        'name': 'The Sovereign Individual',
        'description': 'Mastering the Transition to the Information Age',
        'pricing_type': 'fixed_price',
        'local_price': {
            'amount': '100.00',
            'currency': 'USD'
        },
        'requested_info': ['name', 'email']
    };
    Checkout.create(checkoutData, function (error, response) {
        console.log(error);
        console.log(response);
    });
}