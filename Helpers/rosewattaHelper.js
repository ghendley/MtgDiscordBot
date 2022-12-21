const {TwitterApi} = require('twitter-api-v2')

const {TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET} = process.env


const getRosewattaTweet = async () => {
    const client = new TwitterApi({
        appKey: TWITTER_CONSUMER_KEY,
        appSecret: TWITTER_CONSUMER_SECRET,
        accessToken: TWITTER_ACCESS_TOKEN,
        accessSecret: TWITTER_ACCESS_TOKEN_SECRET
    })

    const results = await client.v2.search(
        `(from:RosewattaStone) #GoogleTranslatesMTG`,
        {
            'media.fields': ['media_key', 'url'],
            'user.fields': ['username', 'name', 'profile_image_url', 'url'],
            'tweet.fields': ['author_id'],
            'expansions': ['attachments.media_keys', 'author_id']
        }
    )

    if (results.meta.result_count === 0) {
        return null
    }

    const randomIndex = Math.floor(Math.random() * results.meta.result_count)
    const foundTweet = results.tweets[randomIndex]

    const tweetUrl = foundTweet.text.trim().split(' ').pop()
    const tweetText = foundTweet.text.replace(tweetUrl, '')
    const foundTweetMediaIds = foundTweet.attachments.media_keys
    const foundMediaUrl = results.includes.media.find(media => media.type === 'photo' && foundTweetMediaIds.includes(media.media_key)).url
    const author = results.includes.author(foundTweet)

    return {
        tweetText: tweetText,
        tweetUrl: tweetUrl,
        mediaUrl: foundMediaUrl,
        authorName: author.name,
        authorProfileImageUrl: author.profile_image_url
    }
}


module.exports = {
    getRosewattaTweet
}
