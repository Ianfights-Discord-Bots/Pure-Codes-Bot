var Express = require('express');
var Webhook = require('coinbase-commerce-node').Webhook;
import sgMail from '@sendgrid/mail';
sgMail.setApiKey('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')


var webhookSecret = 'eaf33f0e-28a3-4d48-bd8f-6a32551f7efd';
var router = Express.Router();
var app = Express();




function rawBody(req, res, next) {
    req.setEncoding('utf8');

    var data = '';

    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        req.rawBody = data;
        next();
    });
}

router.post('/', function (request, response) {
    var event;
    try {
        event = Webhook.verifyEventBody(
            request.rawBody,
            request.headers['x-cc-webhook-signature'],
            webhookSecret
        );
    } catch (error) {
        console.log('Error occured', error.message);

        return response.status(400).send('Webhook Error:' + error.message);
    }

    let metadeta = event.data.metadata;
    console.log(event.type)
    switch (event.type) {
        case 'charge:confirmed':
            console.log('Payment Sucessful');
            sgMail
                .send({
                    to: metadeta.email, // Change to your recipient
                    from: 'support@chimpspurecodes.cf', // Change to your verified sender
                    subject: 'Payment Confirmed',
                    text: 'Your payment has been confirmed! The codes should arrive in your inbox shortly.',
                });
            break;
        case 'charge:pending':
            console.log('payment pending');
            sgMail
                .send({
                    to: metadeta.email, // Change to your recipient
                    from: 'support@chimpspurecodes.cf', // Change to your verified sender
                    subject: 'Payment Pending',
                    text: 'You payment is currently pending. The time this takes is dependent on how you set your fee, please be patient, as this might take up to 30 minutes.',
                })
            break;


    }

    response.status(200).send('Signed Webhook Received: ' + event.id);
});

app.use(rawBody);
app.use(router);
app.listen(3001, function () {
    console.log('App listening on port 3001');
});