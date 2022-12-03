const {getCardByCardMessage} = require('../Helpers/cardByCardFormattingHelpers')
const {searchCardsByHash, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handleCardByCard = async (page, pageCardNo, queryHash, interaction) => {
    const {cards, totalCards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return
    }

    const card = await lookupCardByCard(cards[pageCardNo - 1])
    const message = getCardByCardMessage(card, pageCardNo, cards.length, totalCards, page, totalPages, queryHash)

    await interaction.update(message)
}


module.exports = handleCardByCard
