const {getCardEmbeds} = require('../Helpers/cardFormattingHelpers')
const {getCardByCardActionRow} = require('../Helpers/cardByCardFormattingHelpers')
const {searchCardsByHash, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handleCardByCard = async (page, cardNum, queryHash, interaction) => {
    const {cards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return
    }

    const card = await lookupCardByCard(cards[cardNum - 1])
    const embeds = getCardEmbeds(card)
    const row = getCardByCardActionRow(cardNum, cards.length, page, totalPages, queryHash)

    await interaction.update({
        content: '',
        embeds: embeds,
        components: [row]
    })
}


module.exports = handleCardByCard
