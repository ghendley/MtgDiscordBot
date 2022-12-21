const {EmbedBuilder} = require('discord.js')


const getRosewattaTweetEmbed = async (tweet) => {
    return new EmbedBuilder()
        .setTitle(tweet.authorName)
        .setURL(tweet.tweetUrl)
        .setDescription(tweet.tweetText)
        .setImage(tweet.mediaUrl)
        .setThumbnail(tweet.authorProfileImageUrl)
        .setColor(0x1da1f2)
}


module.exports = {
    getRosewattaTweetEmbed
}
