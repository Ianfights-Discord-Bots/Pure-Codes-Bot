import { readJson } from "../../util/readJson";
import * as coinbase from 'coinbase-commerce-node';
import * as fs from 'fs'
import { initCheckouts } from "./initCheckouts";
const Checkout = coinbase.resources.Checkout;

export const delPrevCheckouts = () => {
    readJson('./checkouts.json', (err, checkouts) => {
        if(!checkouts){
            console.log("No id's skipping to init");
            initCheckouts();
            return;
        }
        for (let i in checkouts.checkouts) {
            Checkout.deleteById(checkouts.checkouts[i], function (error, response) {
                // console.log(error);
                // console.log(response);
            });

        }

        fs.writeFileSync('./checkouts.json','{"checkouts":[], "order":[]}');
        initCheckouts();
    });

}