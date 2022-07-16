import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    Intents,
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
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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

    async setPermissions(commands, guildId) {
        // Get the list of commands
        let cmdList = await this.guilds.cache.get(guildId).commands.fetch()
        // Have to do it this way because it errors out
        // @ts-ignore
        cmdList = await cmdList.toJSON()
        // console.log(command)
        for (let i in commands) {
            let permissions = [];
            let command = await this.guilds.cache.get(guildId).commands.fetch(await cmdList[i].id);
            if (!commands[i].Permissions) {
                // No permissions object so incase try to enable default all
                if (command.defaultPermission === false) {
                    command.defaultPermission = true;
                }
            } else {
                permissions = commands[i].Permissions;
                // now that we have the command we know that it needs special permissions so we can go ahead and deny @everyone the ability to use it
                command.defaultPermission = false;
                await command.permissions.add({ permissions })
            }

        }
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
