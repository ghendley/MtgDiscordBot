const updateInteractionMessageWithError = async (interaction, errorMessage) => {
    if (interaction.message.content.includes('⚠️')) {
        await interaction.update({})
    } else {
        await interaction.update({
            content: `⚠️ **${errorMessage}**\n\n${interaction.message.content}`
        })
    }
}


module.exports = {
    updateInteractionMessageWithError
}
