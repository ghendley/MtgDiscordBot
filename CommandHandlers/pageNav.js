const {getCardSelector} = require('../Helpers/cardListFormattingHelpers')
const {searchCardsByHash} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handlePageNav = async (page, queryHash, interaction) => {
    const {cards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return;
    }

    const message = getCardSelector(cards, page, totalPages, queryHash)
    await interaction.update(message)
}


module.exports = handlePageNav
