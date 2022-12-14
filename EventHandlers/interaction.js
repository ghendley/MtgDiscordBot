const {handleCardByCardInteraction} = require('../CommandHandlers/cardByCard')
const {handlePagedCardSearchInteraction} = require('../CommandHandlers/pagedCardSearch')
const {handleLookupCardByIdInteraction} = require('../CommandHandlers/lookupCard')
const {handleWishlistAddInteraction, handleWishlistRemoveInteraction} = require('../CommandHandlers/wishlist')
const {handleCollectionAddInteraction, handleCollectionRemoveInteraction} = require('../CommandHandlers/collection')
const {upsertUserFromDiscordUser} = require('../DB/Helpers/userHelpers')

// TODO Implement stringSelectMenu search for handling 25 (*4=100) cards at a time in dropdown format

const handleInteraction = async (interaction) => {
    const {user:author} = interaction

    if (author.bot) {
        return false
    }

    if (interaction.isButton()) {
        const buttonData = JSON.parse(interaction.customId)
        switch (buttonData.type) {
            case 'pcs':
                await upsertUserFromDiscordUser(author)
                await handlePagedCardSearchInteraction(buttonData.p, buttonData.q, interaction)
                return true
            case 'card':
                await upsertUserFromDiscordUser(author)
                await handleLookupCardByIdInteraction(buttonData.id, interaction)
                return true
            case 'cbc':
                await upsertUserFromDiscordUser(author)
                await handleCardByCardInteraction(buttonData.p, buttonData.n, buttonData.q, interaction)
                return true
            case 'wla':
                await upsertUserFromDiscordUser(author)
                await handleWishlistAddInteraction(buttonData.id, interaction)
                return true
            case 'wlr':
                await upsertUserFromDiscordUser(author)
                await handleWishlistRemoveInteraction(buttonData.id, interaction)
                return true
            case 'cola':
                await upsertUserFromDiscordUser(author)
                await handleCollectionAddInteraction(buttonData.id, interaction)
                return true
            case 'colr':
                await upsertUserFromDiscordUser(author)
                await handleCollectionRemoveInteraction(buttonData.id, interaction)
                return true
            default:
                await interaction.update({})
                return false
        }
    }
}


module.exports = {
    handleInteraction
}
