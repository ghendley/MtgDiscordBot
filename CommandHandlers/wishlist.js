const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleWishListAddInteraction = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot add ${card.name} to your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleWishListRemoveInteraction = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot remove ${card.name} from your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}


module.exports = {
    handleWishListAddInteraction,
    handleWishListRemoveInteraction
}
