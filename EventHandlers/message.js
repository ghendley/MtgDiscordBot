const {parseCommand} = require('../Helpers/commandHelpers')
const {handleSearchCardMessage} = require('../CommandHandlers/searchCard')
const {handleCardByCardMessage} = require('../CommandHandlers/cardByCard')

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
            await handleSearchCardMessage(query, message)
            return true
        case '.cbc':
            await handleCardByCardMessage(query, message)
            return true
        // TODO Handle wishlist and collection message commands
        // case '.wish':
        //     await handleAddWishListMessage(query, message)
        //     return true
        // case '.unwish':
        //     await handleRemoveWishListMessage(query, message)
        //     return true
        // case '.wishlist':
        //     await handleGetWishListMessage(query, message)
        //     return true
        // case '.collect':
        //     await handleAddCollectionMessage(query, message)
        //     return true
        // case '.uncollect':
        //     await handleRemoveCollectionMessage(query, message)
        //     return true
        // case '.collection':
        //     await handleGetCollectionMessage(query, message)
        //     return true
        default:
            return false
    }
}

module.exports = {
    handleMessage
}
