import { EmbedBuilder } from 'discord.js';
const sellix = require("@sellix/node-sdk")("GxJa6sWhWqF5OwHWTBviLoLe5DCXt3N6ogWHMZsq43PmVyxXj9xRqximENRPeHzv", "chimps-supplies")
import { client } from '..';
import { getStock } from '../lib/db/codeManagement/getStock';
import { getLastId } from '../lib/db/configManagement/getPreviousMessageId';
import { updateStockId } from '../lib/db/configManagement/updateStockId';
// import { sellix } from '..';
const channelId = process.env.channelId;

const updateStock = async () => {
    const options = {method: 'GET', headers: {Authorization: 'Bearer GxJa6sWhWqF5OwHWTBviLoLe5DCXt3N6ogWHMZsq43PmVyxXj9xRqximENRPeHzv'}};

    let product = await (await fetch('https://dev.sellix.io/v1/products/66432281e3af4', options)).json();
    //   .then(response => response.json())
    //   .then(response => console.log(response.data.product.stock))
    //   .catch(err => console.error(err));
    // console.log(await product)

    const channel = await client.channels.cache.get(channelId)

    const stock = new EmbedBuilder()
        .setColor('#46bdf0')
        .setTitle('Stock')
        //@ts-ignore
        .setDescription(`14 Day: **${await product.data.product.stock}**`);             //@ts-ignore
    let newId = await channel.send({ embeds: [stock], content: `If a specific code is out of stock you will still be able to get it, however it will take more time.\nInterested in any codes? Make a ticket!` });
    newId = await newId.id
    const previousMessageId = await getLastId();

    if (previousMessageId) {
        //@ts-ignore
        const previousMessage = await channel.messages.fetch(previousMessageId);

        await previousMessage.delete()
    }
    // await newId;

    updateStockId(await newId)
    console.log(await sellix.products.list());
}

export { updateStock as updateStock }
