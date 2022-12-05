const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

const {getCardEmbeds} = require('./cardFormatter')
const {getPageButtons} = require('./navButtonFormatter')
const {CARDS_PER_PAGE} = require('../globalVars')


const getCardByCardMessage = (card, pageCardNo, totalCardsOnPage, totalCards, page, totalPages, queryHash) => {
    const previousButton = {
        type: 'cbc',
        p: pageCardNo === 1 ? page - 1 : page,
        n: pageCardNo === 1 ? CARDS_PER_PAGE : pageCardNo - 1,
        q: queryHash
    }
    const nextButton = {
        type: 'cbc',
        p: pageCardNo === CARDS_PER_PAGE ? page + 1 : page,
        n: pageCardNo === CARDS_PER_PAGE ? 1 : pageCardNo + 1,
        q: queryHash
    }
    const pageButtons = getPageButtons(
        JSON.stringify(previousButton),
        pageCardNo === 1 && page === 1,
        JSON.stringify(nextButton),
        pageCardNo === totalCardsOnPage && page === totalPages
    )

    const searchButton = new ButtonBuilder()
        .setCustomId(JSON.stringify({type: 'pcs', p: page, q: queryHash}))
        .setLabel(`Paged Search`)
        .setStyle(ButtonStyle.Success)
        .setEmoji('🔍')

    const row = new ActionRowBuilder()
        .addComponents(...pageButtons, searchButton)

    const embeds = getCardEmbeds(card)

    return {
        content: `Card ${(page - 1) * CARDS_PER_PAGE + pageCardNo} of ${totalCards}`,
        embeds: embeds,
        components: [row]
    }
}


module.exports = {
    getCardByCardMessage
}
