const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleWishlistAddInteraction = async (buttonData, interaction, user) => {
    const {id:cardId} = buttonData

    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot add ${card.name} to your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleWishlistRemoveInteraction = async (buttonData, interaction, user) => {
    const {id:cardId} = buttonData

    const card = await lookupCardById(cardId)

    interaction.reply(
        {
            content: `⚠️ Cannot remove ${card.name} from your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}


// TODO also reply to these messages with an emoji reaction
const handleWishlistAddMessage = async (query, message, user) => {
    message.reply(
        {
            content: `⚠️ Cannot add ${query} to your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleWishlistRemoveMessage = async (query, message, user) => {
    message.reply(
        {
            content: `⚠️ Cannot remove ${query} from your Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}

const handleWishlistGetMessage = async (query, message, user) => {
    message.reply(
        {
            content: `⚠️ Cannot get Wish List: Feature not yet implemented.`,
            ephemeral: true
        }
    )
}


module.exports = {
    handleWishlistAddInteraction,
    handleWishlistRemoveInteraction,
    handleWishlistAddMessage,
    handleWishlistRemoveMessage,
    handleWishlistGetMessage
}
