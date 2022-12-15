const {getPagedCardSearchMessage} = require('../Formatters/cardListFormatter')
const {searchCardsByHash} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')


const handlePagedCardSearchInteraction = async (buttonData, interaction, user) => {
    const {p:page, q:queryHash} = buttonData

    const {cards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return
    }

    const message = getPagedCardSearchMessage(cards, page, totalPages, queryHash)
    await interaction.update(message)
}


module.exports = {
    handlePagedCardSearchInteraction
}
