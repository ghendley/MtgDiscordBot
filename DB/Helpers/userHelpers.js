const User = require('../Models/user')

const {USE_DB} = require('../../globalVars')


const retrieveUserFromDb = async (discordId) => {
    if (!USE_DB) {
        return null
    }

    return User.findOne({discordId: discordId})
}

const upsertUser = async (guildMember) => {
    if (!USE_DB) {
        return
    }

    const user = {
        discordId: guildMember.user.id,
        discordUsername: guildMember.user.username,
        discordDiscriminator: guildMember.user.discriminator,
        discordDisplayName: guildMember.displayName,
        discordAvatar: guildMember.avatar ?? guildMember.user.avatar,
        discordAvatarUrl: guildMember.displayAvatarURL()
    }

    await User.findOneAndUpdate({discordId: user.discordId}, user, {upsert: true})
}


module.exports = {
    retrieveUserFromDb,
    upsertUser
}
