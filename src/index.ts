require("dotenv").config();
import { startJobs } from "./lib/startJobs";
import { ExtendedClient } from "./lib/structures/Client";

export const client = new ExtendedClient();


client.start();
startJobs();

export {client as mainClient}