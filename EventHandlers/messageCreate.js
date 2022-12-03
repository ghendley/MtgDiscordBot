const {parseCommand} = require('../Helpers/commandHelpers')
const handleSearchCard = require('../CommandHandlers/searchCard')

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
            await handleSearchCard(query, message)
            return true
        default:
            return false
    }
}

module.exports = {
    handleMessageCreate
}
