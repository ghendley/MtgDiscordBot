const {ButtonBuilder, ButtonStyle} = require('discord.js')


const getWishlistButtons = (cardId) => {
    return [
        new ButtonBuilder()
            .setCustomId(JSON.stringify({type: 'wla', id: cardId}))
            .setLabel(`Wish List`)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('📝'),
        new ButtonBuilder()
            .setCustomId(JSON.stringify({type: 'wlr', id: cardId}))
            .setLabel(`Wish List`)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('❌')
    ]
}

module.exports = {
    getWishlistButtons
}
