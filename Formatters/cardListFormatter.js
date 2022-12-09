const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const {getPageButtons} = require('./navButtonFormatter')


const getPagedCardSearchMessage = (cards, page, totalPages, queryHash) => {
    const multipleCopiesOfSameCard = cards.length > 100 ? false : cards.some((card, index, array) => {
        return array.some((otherCard, otherIndex) => {
            return card.name === otherCard.name && index !== otherIndex
        })
    })

    const rows = cards.map((card) => {
        const labelPrefix = multipleCopiesOfSameCard ? `[${card.set.toUpperCase()}] ` : ''
        return new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(JSON.stringify({type: 'card', id: card.id}))
                    .setLabel(`${labelPrefix}${card.name}`)
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
