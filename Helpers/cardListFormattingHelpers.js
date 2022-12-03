const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')


const getCardSelector = (cards, page, totalPages, queryHash) => {
    const rows = cards.map((card) => {
        return new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(JSON.stringify({type: 'card', id: card.id}))
                    .setLabel(card.name)
                    .setStyle(ButtonStyle.Secondary)
            )
    })

    rows.push(
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(JSON.stringify({type: 'nav', p: page - 1, q: queryHash}))
                    .setLabel(`Back`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('⬅️')
                    .setDisabled(page === 1)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(JSON.stringify({type: 'nav', p: page + 1, q: queryHash}))
                    .setLabel(`Next`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('➡️')
                    .setDisabled(page === totalPages)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(JSON.stringify({type: 'cbc', p: page, n: 1, q: queryHash}))
                    .setLabel(`Card by Card`)
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('📇')
            )
    )

    return {
        content: '**Results** (page ' + page + ' / ' + totalPages + ')',
        components: rows,
        embeds: []
    }
}


module.exports = {
    getCardSelector
}
