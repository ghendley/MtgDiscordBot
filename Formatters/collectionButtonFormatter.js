const {ButtonBuilder, ButtonStyle} = require('discord.js')


const getCollectionButtons = (cardId) => {
    return [
        new ButtonBuilder()
            .setCustomId(JSON.stringify({type: 'cola', id: cardId}))
            .setLabel(`Collection`)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('📝'),
        new ButtonBuilder()
            .setCustomId(JSON.stringify({type: 'colr', id: cardId}))
            .setLabel(`Collection`)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('❌')
    ]
}

module.exports = {
    getCollectionButtons
}
