import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    IntentsBitField,
    PermissionOverwriteManager
} from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    commandFiles
    constructor() {
        super({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent] });
    }

    start() {
        this.registerModules();
        this.login(process.env.botToken);
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
        // this.setPermissions(commands, guildId)
    }



    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        this.commandFiles = await globPromise(
            `${__dirname}/../../commands/*/*{.ts,.js}`
        );
        // console.log(this.commandFiles)
        this.commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            // console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.guildId
            });
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }
}
