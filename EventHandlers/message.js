const {parseCommand} = require('../Helpers/commandHelpers')
const {handleSearchCardMessage} = require('../CommandHandlers/searchCard')
const {handleCardByCardMessage} = require('../CommandHandlers/cardByCard')
const {handleWishlistAddMessage, handleWishlistRemoveMessage, handleWishlistGetMessage} = require('../CommandHandlers/wishlist')
const {handleCollectionAddMessage, handleCollectionRemoveMessage, handleCollectionGetMessage} = require('../CommandHandlers/collection')
const {upsertUserFromDiscordUser} = require('../DB/Helpers/userHelpers')


// TODO .rulings
// TODO .prices (by set or by card)
// TODO .keyword

const handleMessage = async (message) => {
    const {content, author} = message

    if (author.bot) {
        return false
    }

    const {command, query} = parseCommand(content)

    switch (command) {
        case '.card':
            await upsertUserFromDiscordUser(author)
            await handleSearchCardMessage(query, message)
            return true
        case '.cbc':
            await upsertUserFromDiscordUser(author)
            await handleCardByCardMessage(query, message)
            return true
        // TODO Consider making wish, unwish, collect, uncollect slash commands and collection and wishlist both dot and slash commands
        case '.wish':
            await upsertUserFromDiscordUser(author)
            await handleWishlistAddMessage(query, message)
            return true
        case '.unwish':
            await upsertUserFromDiscordUser(author)
            await handleWishlistRemoveMessage(query, message)
            return true
        case '.wishlist':
            await upsertUserFromDiscordUser(author)
            await handleWishlistGetMessage(query, message)
            return true
        case '.collect':
            await upsertUserFromDiscordUser(author)
            await handleCollectionAddMessage(query, message)
            return true
        case '.uncollect':
            await upsertUserFromDiscordUser(author)
            await handleCollectionRemoveMessage(query, message)
            return true
        case '.collection':
            await upsertUserFromDiscordUser(author)
            await handleCollectionGetMessage(query, message)
            return true
        default:
            return false
    }
}


module.exports = {
    handleMessage
}
