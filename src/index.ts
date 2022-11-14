require("dotenv").config();
import { ExtendedClient } from "./lib/structures/Client";

export const client = new ExtendedClient();


client.start();


export {client as mainClient}