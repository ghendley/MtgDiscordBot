const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleCollectionAddInteraction = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot add ${card.name} to your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionRemoveInteraction = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot remove ${card.name} from your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}


module.exports = {
    handleCollectionAddInteraction,
    handleCollectionRemoveInteraction
}
