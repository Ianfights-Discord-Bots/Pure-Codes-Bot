require("dotenv").config();
import { ActivityType } from "discord.js";
import { createButtons } from "./autoPurchase/createButtons";
import { delPrevCheckouts } from "./autoPurchase/init/delPrevCheckouts";
import { initCheckouts } from "./autoPurchase/init/initCheckouts";
import { startJobs } from "./lib/startJobs";
import { ExtendedClient } from "./lib/structures/Client";

var coinbase = require('coinbase-commerce-node');
var Client = coinbase.Client;

Client.init('2fccc3bd-7f47-419f-8b24-10adf39f134c')

export const client = new ExtendedClient();


client.start();
startJobs();
// delPrevCheckouts();
// createButtons();
// initCheckouts();

export {client as mainClient}

export { Client as coinbaseClient}