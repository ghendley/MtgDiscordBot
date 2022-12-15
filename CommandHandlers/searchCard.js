const {ActionRowBuilder} = require('discord.js')

const {getCardEmbeds} = require('../Formatters/cardEmbedFormatter')
const {getPagedCardSearchMessage} = require('../Formatters/cardListFormatter')
const {searchCards, lookupCardById} = require('../Helpers/cardSearchHelpers')
const {getWishlistButtons} = require('../Formatters/wishlistButtonFormatter')
const {getCollectionButtons} = require('../Formatters/collectionButtonFormatter')

const {WISHLISTS_ENABLED, COLLECTIONS_ENABLED} = require('../globalVars')


const handleSearchCardMessage = async (searchTerm, discordMsg, user) => {
    const {cards, totalPages, queryHash} = await searchCards(searchTerm, 1)

    if (cards.length === 0) {
        await discordMsg.reply('Sorry, no cards found for that query.')
    } else if (cards.length === 1) {
        const card = await lookupCardById(cards[0].id)

        const embeds = getCardEmbeds(card)

        const components = []
        if (WISHLISTS_ENABLED) {
            components.push(new ActionRowBuilder().addComponents(getWishlistButtons(card.id)))
        }
        if (COLLECTIONS_ENABLED) {
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
