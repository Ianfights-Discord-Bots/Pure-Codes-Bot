import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * // Optional
 * Permissions: [
 * {
 *      id: 'id of user or role',
 *      type: 'ROLE' | 'USER',
 *      permission: true | false
 * }
 * ],
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

interface Permissions {
    id: string,
    type: 'ROLE' | 'USER',
    permission: true | false
}


type RunFunction = (options: RunOptions) => any;


export type CommandType = {
    Permissions?: Permissions[];
    run: RunFunction;
} & ChatInputApplicationCommandData;
