const {parseCommand} = require('../Helpers/commandHelpers')
const {handleSearchCardMessage} = require('../CommandHandlers/searchCard')
const {handleCardByCardMessage} = require('../CommandHandlers/cardByCard')
const {handleWishlistAddMessage, handleWishlistRemoveMessage, handleWishlistGetMessage} = require('../CommandHandlers/wishlist')
const {handleCollectionAddMessage, handleCollectionRemoveMessage, handleCollectionGetMessage} = require('../CommandHandlers/collection')
const {upsertUser} = require('../DB/Helpers/userHelpers')


// TODO .rulings
// TODO .prices (by set or by card)
// TODO .keyword

const handleMessage = async (message) => {
    const {content, author, member} = message

    if (author.bot) {
        return false
    }

    const {command, query} = parseCommand(content)

    switch (command) {
        case '.card':
            await upsertUser(member)
            await handleSearchCardMessage(query, message)
            return true
        case '.cbc':
            await upsertUser(member)
            await handleCardByCardMessage(query, message)
            return true
        // TODO Consider making wish, unwish, collect, uncollect slash commands and collection and wishlist both dot and slash commands
        case '.wish':
            await upsertUser(member)
            await handleWishlistAddMessage(query, message)
            return true
        case '.unwish':
            await upsertUser(member)
            await handleWishlistRemoveMessage(query, message)
            return true
        case '.wishlist':
            await upsertUser(member)
            await handleWishlistGetMessage(query, message)
            return true
        case '.collect':
            await upsertUser(member)
            await handleCollectionAddMessage(query, message)
            return true
        case '.uncollect':
            await upsertUser(member)
            await handleCollectionRemoveMessage(query, message)
            return true
        case '.collection':
            await upsertUser(member)
            await handleCollectionGetMessage(query, message)
            return true
        default:
            return false
    }
}


module.exports = {
    handleMessage
}
