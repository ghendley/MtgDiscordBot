const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const {CARDS_PER_PAGE} = require('../globalVars')


const getCardByCardActionRow = (cardNum, totalCardsOnPage, page, totalPages, queryHash) => {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'cbc', p: cardNum === 1 ? page - 1 : page, n: cardNum === 1 ? CARDS_PER_PAGE : cardNum - 1, q: queryHash}))
                .setLabel(`Back`)
                .setStyle(ButtonStyle.Primary)
                .setEmoji('⬅️')
                .setDisabled(cardNum === 1 && page === 1)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'cbc', p: cardNum === CARDS_PER_PAGE ? page + 1 : page, n: cardNum === CARDS_PER_PAGE ? 1 : cardNum + 1, q: queryHash}))
                .setLabel(`Next`)
                .setStyle(ButtonStyle.Primary)
                .setEmoji('➡️')
                .setDisabled(cardNum === totalCardsOnPage && page === totalPages)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'nav', p: page, q: queryHash}))
                .setLabel(`Search List`)
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔍')
        )
}


module.exports = {
    getCardByCardActionRow
}
