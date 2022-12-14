const {handleCardByCardInteraction} = require('../CommandHandlers/cardByCard')
const {handlePagedCardSearchInteraction} = require('../CommandHandlers/pagedCardSearch')
const {handleLookupCardByIdInteraction} = require('../CommandHandlers/lookupCard')
const {handleWishlistAddInteraction, handleWishlistRemoveInteraction} = require('../CommandHandlers/wishlist')
const {handleCollectionAddInteraction, handleCollectionRemoveInteraction} = require('../CommandHandlers/collection')
const {upsertUser} = require('../DB/Helpers/userHelpers')

// TODO Implement stringSelectMenu search for handling 25 (*4=100) cards at a time in dropdown format

const handleInteraction = async (interaction) => {
    const {user, member} = interaction

    if (user.bot) {
        return false
    }

    if (interaction.isButton()) {
        const buttonData = JSON.parse(interaction.customId)
        switch (buttonData.type) {
            case 'pcs':
                await upsertUser(member)
                await handlePagedCardSearchInteraction(buttonData.p, buttonData.q, interaction)
                return true
            case 'card':
                await upsertUser(member)
                await handleLookupCardByIdInteraction(buttonData.id, interaction)
                return true
            case 'cbc':
                await upsertUser(member)
                await handleCardByCardInteraction(buttonData.p, buttonData.n, buttonData.q, interaction)
                return true
            case 'wla':
                await upsertUser(member)
                await handleWishlistAddInteraction(buttonData.id, interaction)
                return true
            case 'wlr':
                await upsertUser(member)
                await handleWishlistRemoveInteraction(buttonData.id, interaction)
                return true
            case 'cola':
                await upsertUser(member)
                await handleCollectionAddInteraction(buttonData.id, interaction)
                return true
            case 'colr':
                await upsertUser(member)
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
