const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const {getPageButtons} = require('./navButtonFormattingHelpers')


const getPagedCardSearchMessage = (cards, page, totalPages, queryHash) => {
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
                ...getPageButtons(
                    JSON.stringify({type: 'pcs', p: page - 1, q: queryHash}),
                    page === 1,
                    JSON.stringify({type: 'pcs', p: page + 1, q: queryHash}),
                    page === totalPages
                ),
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
    getPagedCardSearchMessage
}
