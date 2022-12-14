const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
        discordId: {
            type: String,
            required: true,
            unique: true
        },
        discordUsername: {
            type: String,
            required: true
        },
        discordDiscriminator: {
            type: String,
            required: true
        },
        discordAvatar: {
            type: String,
            required: false
        },
        discordAvatarUrl: {
            type: String,
            required: false
        },
        discordBanner: {
            type: String,
            required: false
        },
        discordBannerUrl: {
            type: String,
            required: false
        },
        discordAccentColor: {
            type: String,
            required: false
        }
    },
    {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
)


module.exports = mongoose.model('User', UserSchema)
