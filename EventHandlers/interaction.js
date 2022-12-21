const {handleCardByCardInteraction} = require('../CommandHandlers/cardByCard')
const {handlePagedCardSearchInteraction} = require('../CommandHandlers/pagedCardSearch')
const {handleLookupCardByIdInteraction} = require('../CommandHandlers/lookupCard')
const {handleWishlistAddInteraction, handleWishlistRemoveInteraction} = require('../CommandHandlers/wishlist')
const {handleCollectionAddInteraction, handleCollectionRemoveInteraction} = require('../CommandHandlers/collection')
const {upsertUser} = require('../DB/Helpers/userHelpers')

// TODO Implement stringSelectMenu search for handling 25 (*4=100) cards at a time in dropdown format

const interactions = {
    'pcs': handlePagedCardSearchInteraction,
    'card': handleLookupCardByIdInteraction,
    'cbc': handleCardByCardInteraction,
    'wla': handleWishlistAddInteraction,
    'wlr': handleWishlistRemoveInteraction,
    'cola': handleCollectionAddInteraction,
    'colr': handleCollectionRemoveInteraction
}

const handleInteraction = async (interaction) => {
    if (interaction.isButton()) {
        const {member} = interaction
        const buttonData = JSON.parse(interaction.customId)

        if (member.user.bot || !(buttonData.type in interactions)) {
            return false
        }

        const user = await upsertUser(member)

        await interactions[buttonData.type](buttonData, interaction, user)
        return true
    }

    return false
}


module.exports = {
    handleInteraction
}
