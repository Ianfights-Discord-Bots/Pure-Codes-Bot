import { client } from "..";
import { Event } from "../lib/structures/Event";

export default new Event("ready", () => {
    console.log("Bot is online");
    client.user.setActivity("monkey's codes!", {type: 'WATCHING'});

});
