const User = require('../Models/user')

const {USE_DB} = require('../../globalVars')


const retrieveUserFromDb = async (discordId) => {
    if (!USE_DB) {
        return null
    }

    return User.findOne({discordId: discordId})
}

const upsertUserFromDiscordUser = async (author) => {
    if (!USE_DB) {
        return
    }

    const user = {
        discordId: author.id,
        discordUsername: author.username,
        discordDiscriminator: author.discriminator,
        discordAvatar: author.avatar,
        discordAvatarUrl: author.displayAvatarURL(),
        discordBanner: author.banner,
        discordBannerUrl: author.bannerURL(),
        discordAccentColor: author.accentColor
    }

    await User.findOneAndUpdate({discordId: user.discordId}, user, {upsert: true})
}


module.exports = {
    retrieveUserFromDb,
    upsertUserFromDiscordUser
}
