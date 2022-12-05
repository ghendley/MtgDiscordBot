const {getCardByCardMessage} = require('../Formatters/cardByCardFormatter')
const {searchCards, searchCardsByHash, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
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


const handleCardByCardMessage = async (searchTerm, discordMsg) => {
    const {cards, totalCards, totalPages, queryHash} = await searchCards(searchTerm, 1)

    if (cards.length === 0 || totalPages === 0) {
        await discordMsg.reply('Sorry, no cards found for that query.')
        return
    }

    const card = await lookupCardByCard(cards[0])
    const message = getCardByCardMessage(card, 1, cards.length, totalCards, 1, totalPages, queryHash)

    await discordMsg.reply(message)
}


module.exports = {
    handleCardByCardInteraction,
    handleCardByCardMessage
}
