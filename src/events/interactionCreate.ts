import { CommandInteractionOptionResolver, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { client } from "..";
import bulkAdd from "../commands/CodeManagement/bulkAdd";
import { Event } from "../lib/structures/Event";
import { ExtendedInteraction } from "../lib/typings/Command";
import { click } from "./cryptoClick/click";
import { openAccTicket } from "./ticketCreations/account/accTicket";
import { openGoldTicket } from "./ticketCreations/gold/goldTicket";
import { addBulk } from "./ticketCreations/membership/addBulk";
import { openMembershipTicket } from "./ticketCreations/membership/membershipTicket";
import { autoInvoiceCreate } from "./ticketCreations/membership/createAutoInvoice";

export default new Event("interactionCreate", (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        // await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({ content: "You have used a non existent command", ephemeral: true });

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    } else if (interaction.isButton() || interaction.isAnySelectMenu() || interaction.isModalSubmit()) {
        //@ts-ignore
        switch (interaction.customId) {
            case 'ticketSelect':
                //@ts-ignore
                switch (interaction.values[0]) {
                    case 'membershipCodes':
                        openMembershipTicket(interaction)
                        break;
                    case 'accounts':
                        openAccTicket(interaction)
                        break;
                    case 'gold':
                        openGoldTicket(interaction);
                        break;
                }
                break;
            case 'deleteTicket':
                interaction.channel.delete();
                break;
            case 'autoBuyCreate':
                const modal = new ModalBuilder()
                .setCustomId('cryptoAutoBuy')
                .setTitle('Upload Codes');
    
            const codeInput = new TextInputBuilder()
                .setCustomId('amount')
                .setLabel("Number of codes desired")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
    
                const email = new TextInputBuilder()
                .setCustomId('email')
                .setLabel("Email where codes will be sent")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
    
            const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
            const sar = new ActionRowBuilder().addComponents(email);

            //@ts-ignore
            modal.addComponents(firstActionRow,sar);
            //@ts-ignore
            interaction.showModal(modal);
                break;
            case 'bulkAdd':
                //@ts-ignore
                // console.log(interaction.fields.fields.get('codes'))
                addBulk(interaction)
                break;
            case 'cryptoAutoBuy':
                autoInvoiceCreate(interaction)
            break;
                }
        if (interaction.customId.includes('ticketClose', 0)) {
                    let user = interaction.customId.replace('ticketClose_', '');
                    //@ts-ignore
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: process.env.guildId,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        // {
                        //     id: hostId,
                        //     allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        // },
                        // {
                        //     id: '923825468015276033',
                        //     allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        // }
                    ]);
                    //@ts-ignore
                    interaction.channel.setParent('997628545700479076')
                    //@ts-ignore
                    interaction.channel.setName(`closedTicket_${user}`)

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('deleteTicket')
                                .setLabel('Delete Ticket')
                                .setStyle(ButtonStyle.Danger),
                        );
                    //@ts-ignore
                    client.channels.cache.get(interaction.channel.id).send({ content: 'Click the button below to delete this ticket', components: [row] });
                    interaction.deferUpdate();

                }

        }
    });
