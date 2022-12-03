const {getCardEmbeds} = require('../Helpers/cardFormattingHelpers')
const {getCardSelector} = require('../Helpers/cardListFormattingHelpers')
const {searchCards} = require('../Helpers/cardSearchHelpers')


const handleSearchCard = async (searchTerm, discordMsg) => {
    const {cards, totalPages, queryHash} = await searchCards(searchTerm)

    if (cards.length === 0) {
        discordMsg.reply('Sorry, no cards found for that query.')
    } else if (cards.length === 1) {
        const card = cards[0]
        card.rulings = await card.getRulings()
        const embeds = getCardEmbeds(card)
        await discordMsg.reply({
            embeds: embeds
        })
    } else {
        const message = getCardSelector(cards, 1, totalPages, queryHash)
        await discordMsg.reply(message)
    }
}


module.exports = handleSearchCard
