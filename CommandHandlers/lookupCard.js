const {getCardEmbeds} = require('../Formatters/cardEmbedFormatter')
const {lookupCardById} = require('../Helpers/cardSearchHelpers')


const handleLookupCardByIdInteraction = async (cardId, interaction) => {
    const card = await lookupCardById(cardId)
    const embeds = getCardEmbeds(card)
    await interaction.update({
        content: '',
        embeds: embeds,
        components: []
    })
}


module.exports = {
    handleLookupCardByIdInteraction
}
