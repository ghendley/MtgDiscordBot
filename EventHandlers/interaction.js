const {handleCardByCardInteraction} = require('../CommandHandlers/cardByCard')
const {handlePagedCardSearchInteraction} = require('../CommandHandlers/pagedCardSearch')
const {handleLookupCardByIdInteraction} = require('../CommandHandlers/lookupCard')
const {handleWishlistAddInteraction, handleWishlistRemoveInteraction} = require('../CommandHandlers/wishlist')
const {handleCollectionAddInteraction, handleCollectionRemoveInteraction} = require('../CommandHandlers/collection')

// TODO Implement stringSelectMenu search for handling 25 (*4=100) cards at a time in dropdown format

const handleInteraction = async (interaction) => {
    if (interaction.isButton()) {
        const buttonData = JSON.parse(interaction.customId)
        switch (buttonData.type) {
            case 'pcs':
                await handlePagedCardSearchInteraction(buttonData.p, buttonData.q, interaction)
                return true
            case 'card':
                await handleLookupCardByIdInteraction(buttonData.id, interaction)
                return true
            case 'cbc':
                await handleCardByCardInteraction(buttonData.p, buttonData.n, buttonData.q, interaction)
                return true
            case 'wla':
                await handleWishlistAddInteraction(buttonData.id, interaction)
                return true
            case 'wlr':
                await handleWishlistRemoveInteraction(buttonData.id, interaction)
                return true
            case 'cola':
                await handleCollectionAddInteraction(buttonData.id, interaction)
                return true
            case 'colr':
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
