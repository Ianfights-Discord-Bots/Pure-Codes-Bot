import { client } from "..";
import { Event } from "../lib/structures/Event";

export default new Event("ready", () => {
    console.log("Bot is online");
    client.user.setActivity("Monkey's Codes!", {type: 'WATCHING'});

});
