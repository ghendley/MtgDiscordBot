const {getCardEmbeds} = require('../Formatters/cardFormatter')
const {getPagedCardSearchMessage} = require('../Formatters/cardListFormatter')
const {searchCards, lookupCardByCard} = require('../Helpers/cardSearchHelpers')


const handleSearchCardMessage = async (searchTerm, discordMsg) => {
    const {cards, totalPages, queryHash} = await searchCards(searchTerm, 1)

    if (cards.length === 0) {
        await discordMsg.reply('Sorry, no cards found for that query.')
    } else if (cards.length === 1) {
        const card = await lookupCardByCard(cards[0])
        const embeds = getCardEmbeds(card)
        await discordMsg.reply({
            embeds: embeds
        })
    } else {
        const message = getPagedCardSearchMessage(cards, 1, totalPages, queryHash)
        await discordMsg.reply(message)
    }
}


module.exports = {
    handleSearchCardMessage
}
