import { Command } from "../../lib/structures/Command";

export default new Command({
    name: 'ping',
    description: 'Checls ping',
    Permissions: [
        {
            id: '726648687593259010',
            type: 'ROLE',
            permission: true
        }
    ],
    run: ({interaction}) => {
        interaction.reply('test')
    }
})