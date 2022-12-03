const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

const {getCardEmbeds} = require('../Helpers/cardFormattingHelpers')
const {getPageButtons} = require('./navButtonFormattingHelpers')
const {CARDS_PER_PAGE} = require('../globalVars')


const getCardByCardMessage = (card, pageCardNo, totalCardsOnPage, totalCards, page, totalPages, queryHash) => {
    const embeds = getCardEmbeds(card)

    const row = new ActionRowBuilder()
        .addComponents(
            ...getPageButtons(
                JSON.stringify({type: 'cbc', p: pageCardNo === 1 ? page - 1 : page, n: pageCardNo === 1 ? CARDS_PER_PAGE : pageCardNo - 1, q: queryHash}),
                pageCardNo === 1 && page === 1,
                JSON.stringify({type: 'cbc', p: pageCardNo === CARDS_PER_PAGE ? page + 1 : page, n: pageCardNo === CARDS_PER_PAGE ? 1 : pageCardNo + 1, q: queryHash}),
                pageCardNo === totalCardsOnPage && page === totalPages
            ),
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'pcs', p: page, q: queryHash}))
                .setLabel(`Paged Search`)
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔍')
        )

    return {
        content: `Card ${(page - 1) * CARDS_PER_PAGE + pageCardNo} of ${totalCards}`,
        embeds: embeds,
        components: [row]
    }
}


module.exports = {
    getCardByCardMessage
}
