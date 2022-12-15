const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleCollectionAddInteraction = async (buttonData, interaction, user) => {
    const {id: cardId} = buttonData

    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot add ${card.name} to your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionRemoveInteraction = async (buttonData, interaction, user) => {
    const {id: cardId} = buttonData

    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot remove ${card.name} from your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

// TODO also reply to these messages with an emoji reaction
const handleCollectionAddMessage = async (query, message, user) => {
    message.reply(
        {
            content: `⚠️ Cannot add ${query} to your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionRemoveMessage = async (query, message, user) => {
    message.reply(
        {
            content: `⚠️ Cannot remove ${query} from your Collection: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleCollectionGetMessage = async (query, message, user) => {
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
