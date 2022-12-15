const {getCardByCardMessage} = require('../Formatters/cardByCardFormatter')
const {searchCards, searchCardsByHash, lookupCardById} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handleCardByCardInteraction = async (buttonData, interaction, user) => {
    const {p:page, n:pageCardNo, q:queryHash} = buttonData

    const {cards, totalCards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return
    }

    const card = await lookupCardById(cards[pageCardNo - 1].id)
    const message = getCardByCardMessage(card, pageCardNo, cards.length, totalCards, page, totalPages, queryHash)

    await interaction.update(message)
}


const handleCardByCardMessage = async (searchTerm, discordMsg, user) => {
    const {cards, totalCards, totalPages, queryHash} = await searchCards(searchTerm, 1)

    if (cards.length === 0 || totalPages === 0) {
        await discordMsg.reply('Sorry, no cards found for that query.')
        return
    }

    const card = await lookupCardById(cards[0].id)
    const message = getCardByCardMessage(card, 1, cards.length, totalCards, 1, totalPages, queryHash)

    await discordMsg.reply(message)
}


module.exports = {
    handleCardByCardInteraction,
    handleCardByCardMessage
}
