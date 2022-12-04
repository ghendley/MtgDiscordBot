const {parseCommand} = require('../Helpers/commandHelpers')
const {handleSearchCardMessage} = require('../CommandHandlers/searchCard')
const {handleCardByCardMessage} = require('../CommandHandlers/cardByCard')

// TODO .rulings
// TODO .prices (by set or by card)
// TODO .keyword

const handleMessageCreate = async (message) => {
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
        default:
            return false
    }
}

module.exports = {
    handleMessageCreate
}
