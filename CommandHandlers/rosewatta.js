const {getRosewattaTweet} = require('../Helpers/rosewattaHelper')
const {getRosewattaTweetEmbed} = require('../Formatters/rosewattaEmbedFormatter')

const {ROSEWATTA_ENABLED} = require('../globalVars')


const handleRosewattaMessage = async (searchTerm, discordMsg, user) => {
    if (ROSEWATTA_ENABLED) {
        const tweet = await getRosewattaTweet()

        if (tweet) {
            const tweetEmbed = await getRosewattaTweetEmbed(tweet)

            await discordMsg.reply({
                embeds: [tweetEmbed]
            })
        } else {
            await discordMsg.reply('Sorry, no @RosewattaStone Tweets found.')
        }
    } else {
        await discordMsg.reply('@RosewattaStone search is not enabled.')
    }
}


module.exports = {
    handleRosewattaMessage
}
