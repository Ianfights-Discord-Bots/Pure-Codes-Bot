import { client } from "..";
import { Event } from "../lib/structures/Event";
import { ActivityType } from "discord.js"

export default new Event("ready", () => {
    console.log("Bot is online");
    client.user.setActivity("Monkey's Codes!", { type: ActivityType.Watching });

});
