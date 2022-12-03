const {ButtonBuilder, ButtonStyle} = require('discord.js')


const getPageButtons = (prevId, prevDisabled, nextId, nextDisabled) => {
    return [
        new ButtonBuilder()
            .setCustomId(prevId)
            .setLabel(`Back`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji('⬅️')
            .setDisabled(prevDisabled),
        new ButtonBuilder()
            .setCustomId(nextId)
            .setLabel(`Next`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji('➡️')
            .setDisabled(nextDisabled)
    ]
}


module.exports = {
    getPageButtons
}
