const {getCardEmbeds} = require('../Helpers/cardFormattingHelpers')
const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleLookupCardById = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)
    const embeds = getCardEmbeds(card)
    await interaction.update({
        content: '',
        embeds: embeds,
        components: []
    })
}


module.exports = handleLookupCardById
