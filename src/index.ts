require("dotenv").config();
import { startJobs } from "./lib/startJobs";
import { ExtendedClient } from "./lib/structures/Client";
import { initDb } from "./lib/db/initDb";

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;

Client.init('2fccc3bd-7f47-419f-8b24-10adf39f134c')

export const client = new ExtendedClient();

initDb();

client.start();
// startJobs();



export {client as mainClient}

export { Client as coinbaseClient}