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

// TODO also reply to these messages with an emoji reaction
const handleCollectionAddMessage = async (query, message) => {
    message.reply(
        {
            content: `⚠️ Cannot add ${query} to your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionRemoveMessage = async (query, message) => {
    message.reply(
        {
            content: `⚠️ Cannot remove ${query} from your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionGetMessage = async (query, message) => {
    message.reply(
        {
            content: `⚠️ Cannot get Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}


module.exports = {
    handleCollectionAddInteraction,
    handleCollectionRemoveInteraction,
    handleCollectionAddMessage,
    handleCollectionRemoveMessage,
    handleCollectionGetMessage
}
