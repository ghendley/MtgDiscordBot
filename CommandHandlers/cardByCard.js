const {getCardByCardMessage} = require('../Helpers/cardByCardFormattingHelpers')
const {searchCardsByHash, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handleCardByCardInteraction = async (page, pageCardNo, queryHash, interaction) => {
    const {cards, totalCards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return
    }

    const card = await lookupCardByCard(cards[pageCardNo - 1])
    const message = getCardByCardMessage(card, pageCardNo, cards.length, totalCards, page, totalPages, queryHash)

    await interaction.update(message)
}


const handleCardByCardMessage = async (page, pageCardNo, query, message) => {
    // TODO IMPLEMENT CARD BY CARD MESSAGE SEARCH
    throw 'CBC by message not implemented'
}


module.exports = {
    handleCardByCardInteraction,
    handleCardByCardMessage
}
