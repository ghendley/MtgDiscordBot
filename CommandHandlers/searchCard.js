const {ActionRowBuilder} = require('discord.js')

const {getCardEmbeds} = require('../Formatters/cardFormatter')
const {getPagedCardSearchMessage} = require('../Formatters/cardListFormatter')
const {searchCards, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
const {getWishlistButtons} = require('../Formatters/wishlistButtonFormatter')
const {getCollectionButtons} = require('../Formatters/collectionButtonFormatter')

const {ENABLE_WISHLISTS, ENABLE_COLLECTIONS} = process.env


const handleSearchCardMessage = async (searchTerm, discordMsg) => {
    const {cards, totalPages, queryHash} = await searchCards(searchTerm, 1)

    if (cards.length === 0) {
        await discordMsg.reply('Sorry, no cards found for that query.')
    } else if (cards.length === 1) {
        const card = await lookupCardByCard(cards[0])

        const embeds = getCardEmbeds(card)

        const components = []
        if (ENABLE_WISHLISTS) {
            components.push(new ActionRowBuilder().addComponents(getWishlistButtons(card.id)))
        }
        if (ENABLE_COLLECTIONS) {
            components.push(new ActionRowBuilder().addComponents(getCollectionButtons(card.id)))
        }

        await discordMsg.reply({
            embeds: embeds,
            components: components
        })
    } else {
        const message = getPagedCardSearchMessage(cards, 1, totalPages, queryHash)
        await discordMsg.reply(message)
    }
}


module.exports = {
    handleSearchCardMessage
}
