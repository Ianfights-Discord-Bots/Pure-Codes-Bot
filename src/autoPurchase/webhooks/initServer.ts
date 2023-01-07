import sgMail from '@sendgrid/mail';
import { log } from '../../util/log';
import { readJson } from '../../util/readJson';
import { trunc } from '../../util/trunc';
export const initServer = () => {
    var Express = require('express');
    var Webhook = require('coinbase-commerce-node').Webhook;

    const fs = require('fs')
    sgMail.setApiKey('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')


    var webhookSecret = '2bb5e0f7-e6e7-4cd5-90e2-cbd03e357379';
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
            case 'charge:created':

                readJson('codes.json', async (err, info) => {
                    const codes = info.codes.unused;
                    let usedCodes = info.codes.used;

                    let usedCode = '';

                    let emailCodes = '';

                    const codePrices = info.prices;
                    const amount = event.data.pricing.local.amount / codePrices['16_day']


                    let codesForUser: Array<any> = []
                    // Get the amount of codes the user asked for
                    for (let i = 0; i <= amount; i++) {
                        usedCode = '';
                        usedCode = usedCode + codes[`${length}_days`].shift()
                        usedCodes[`${length}_days`].push(usedCode)

                        codesForUser.push(usedCode)
                    }

                    for (let i in codesForUser) {
                        emailCodes += `${i + 1}: ${codesForUser[i]}<br>`
                    }
                    sgMail
                        .send({
                            to: metadeta.email, // Change to your recipient
                            from: 'support@chimpspurecodes.cf', // Change to your verified sender
                            subject: 'Payment Confirmed',
                            text: 'Your payment has been confirmed! The codes should arrive in your inbox shortly.',
                        });

                    let finalCodes = info;
                    finalCodes.codes.unused = codes;
                    finalCodes.codes.used = usedCodes;

                    finalCodes = JSON.stringify(finalCodes);



                    fs.writeFileSync('./codes.json', finalCodes);
                    const now = new Date();
                    log(`Customer Email: ${metadeta.email}\nCode: ${usedCode}\nLength: ${length}\nDate: ${now}\nCrypto Price: ${trunc(info.prices[`16_day`])}\nMethod: Automated Crypto\n\n`)
                });
                break;

            case 'charge:confirmed':

                readJson('codes.json', async (err, info) => {
                    const codes = info.codes.unused;
                    let usedCodes = info.codes.used;

                    let usedCode = '';

                    let emailCodes = '';

                    const codePrices = info.prices;
                    const amount = event.data.pricing.local.amount / codePrices['16_day']


                    let codesForUser: Array<any> = []
                    // Get the amount of codes the user asked for
                    for (let i = 0; i <= amount; i++) {
                        usedCode = '';
                        usedCode = usedCode + codes[`${length}_days`].shift()
                        usedCodes[`${length}_days`].push(usedCode)

                        codesForUser.push(usedCode)
                    }

                    for (let i in codesForUser) {
                        emailCodes += `${i + 1}: ${codesForUser[i]}<br>`
                    }
                    sgMail
                        .send({
                            to: metadeta.email, // Change to your recipient
                            from: 'support@chimpspurecodes.cf', // Change to your verified sender
                            subject: 'Payment Confirmed',
                            text: 'Your payment has been confirmed! The codes should arrive in your inbox shortly.',
                        });

                    let finalCodes = info;
                    finalCodes.codes.unused = codes;
                    finalCodes.codes.used = usedCodes;

                    finalCodes = JSON.stringify(finalCodes);



                    fs.writeFileSync('./codes.json', finalCodes);
                    const now = new Date();
                    log(`Customer Email: ${metadeta.email}\nCode: ${usedCode}\nLength: ${length}\nDate: ${now}\nCrypto Price: ${trunc(info.prices[`16_day`])}\nMethod: Automated Crypto\n\n`)
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
}