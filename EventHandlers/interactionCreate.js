const handleCardByCard = require('../CommandHandlers/cardByCard')
const handlePagedCardSearch = require('../CommandHandlers/pagedCardSearch')
const handleLookupCardById = require('../CommandHandlers/lookupCard')

// TODO Implement stringSelectMenu search for handling 25 (*4=100) cards at a time in dropdown format

const handleInteractionCreate = async (interaction) => {

    if (interaction.isButton()) {
        const buttonData = JSON.parse(interaction.customId)
        switch (buttonData.type) {
            case 'pcs':
                await handlePagedCardSearch(buttonData.p, buttonData.q, interaction)
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
