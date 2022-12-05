const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

const {getCardEmbeds} = require('./cardFormatter')
const {getPageButtons} = require('./navButtonFormatter')
const {getWishlistButtons} = require('./wishlistButtonFormatter')
const {getCollectionButtons} = require('./collectionButtonFormatter')
const {CARDS_PER_PAGE} = require('../globalVars')

const {ENABLE_WISHLISTS, ENABLE_COLLECTIONS} = process.env


const getCardByCardMessage = (card, pageCardNo, totalCardsOnPage, totalCards, page, totalPages, queryHash) => {
    const previousButtonData = {
        type: 'cbc',
        p: pageCardNo === 1 ? page - 1 : page,
        n: pageCardNo === 1 ? CARDS_PER_PAGE : pageCardNo - 1,
        q: queryHash
    }
    const nextButtonData = {
        type: 'cbc',
        p: pageCardNo === CARDS_PER_PAGE ? page + 1 : page,
        n: pageCardNo === CARDS_PER_PAGE ? 1 : pageCardNo + 1,
        q: queryHash
    }
    const pageButtons = getPageButtons(
        JSON.stringify(previousButtonData),
        pageCardNo === 1 && page === 1,
        JSON.stringify(nextButtonData),
        pageCardNo === totalCardsOnPage && page === totalPages
    )

    const searchButton = new ButtonBuilder()
        .setCustomId(JSON.stringify({type: 'pcs', p: page, q: queryHash}))
        .setLabel(`Paged Search`)
        .setStyle(ButtonStyle.Success)
        .setEmoji('🔍')

    const components = []
    if (ENABLE_WISHLISTS === 'true') {
        components.push(new ActionRowBuilder().addComponents(getWishlistButtons(card.id)))
    }
    if (ENABLE_COLLECTIONS === 'true') {
        components.push(new ActionRowBuilder().addComponents(getCollectionButtons(card.id)))
    }
    components.push(new ActionRowBuilder().addComponents(...pageButtons, searchButton))

    const embeds = getCardEmbeds(card)

    return {
        content: `Card ${(page - 1) * CARDS_PER_PAGE + pageCardNo} of ${totalCards}`,
        embeds: embeds,
        components: components
    }
}


module.exports = {
    getCardByCardMessage
}
