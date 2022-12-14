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
        discordDisplayName: {
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
        }
    },
    {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
)


module.exports = mongoose.model('User', UserSchema)
