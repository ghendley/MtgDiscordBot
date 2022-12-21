const {parseCommand} = require('../Helpers/commandHelpers')
const {handleSearchCardMessage} = require('../CommandHandlers/searchCard')
const {handleCardByCardMessage} = require('../CommandHandlers/cardByCard')
const {handleWishlistAddMessage, handleWishlistRemoveMessage, handleWishlistGetMessage} = require('../CommandHandlers/wishlist')
const {handleCollectionAddMessage, handleCollectionRemoveMessage, handleCollectionGetMessage} = require('../CommandHandlers/collection')
const {handleRosewattaMessage} = require('../CommandHandlers/rosewatta')
const {upsertUser} = require('../DB/Helpers/userHelpers')

// TODO .rulings
// TODO .prices (by set or by card)
// TODO .keyword
// TODO Consider making wish, unwish, collect, uncollect slash commands and collection and wishlist both dot and slash commands

const commands = {
    '.card': handleSearchCardMessage,
    '.cbc': handleCardByCardMessage,
    '.wish': handleWishlistAddMessage,
    '.unwish': handleWishlistRemoveMessage,
    '.wishlist': handleWishlistGetMessage,
    '.collect': handleCollectionAddMessage,
    '.uncollect': handleCollectionRemoveMessage,
    '.collection': handleCollectionGetMessage,
    '.rosewatta': handleRosewattaMessage
}

const handleMessage = async (message) => {
    const {content, author, member} = message
    const {command, query} = parseCommand(content)

    if (author.bot || !(command in commands)) {
        return false
    }

    const user = await upsertUser(member)

    await commands[command](query, message, user)
    return true
}


module.exports = {
    handleMessage
}
