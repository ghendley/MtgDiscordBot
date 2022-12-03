const handleCardByCard = require('../CommandHandlers/cardByCard')
const handlePageNav = require('../CommandHandlers/pageNav')
const handleLookupCardById = require('../CommandHandlers/lookupCard')

const handleInteractionCreate = async (interaction) => {

    if (interaction.isButton()) {
        const buttonData = JSON.parse(interaction.customId)
        switch (buttonData.type) {
            case 'nav':
                await handlePageNav(buttonData.p, buttonData.q, interaction)
                return true
            case 'card':
                await handleLookupCardById(buttonData.id, interaction)
                return true
            case 'cbc':
                await handleCardByCard(buttonData.p, buttonData.n, buttonData.q, interaction)
                return true
            default:
                await interaction.update({})
                return false
        }
    }
}


module.exports = {
    handleInteractionCreate
}
