require('dotenv').config()

const {handleInteractionCreate} = require('./EventHandlers/interactionCreate')
const {handleMessageCreate} = require('./EventHandlers/messageCreate')

const {DISCORD_BOT_TOKEN} = process.env

const {
    Client: DiscordClient,
    GatewayIntentBits: DiscordIntents,
    Events: DiscordEvents
} = require('discord.js')


const client = new DiscordClient({
    intents: [
        DiscordIntents.Guilds,
        DiscordIntents.GuildMessages,
        DiscordIntents.GuildMessageReactions,
        DiscordIntents.MessageContent,
        DiscordIntents.GuildMembers
    ]
})

// TODO Implement proper logging via library
const getGetTimestampString = () => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000
    return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 19)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on(DiscordEvents.MessageCreate, msg => {
    handleMessageCreate(msg)
        .then(wasBotCommand => {
            if (wasBotCommand) {
                console.log(`${getGetTimestampString()} Bot command handled: ${msg.content}`)
            }
        })
        .catch(err => {
            console.error(`${getGetTimestampString()} Error due to message: ${msg.content}`, err)
        })
})

client.on(DiscordEvents.InteractionCreate, interaction => {
    handleInteractionCreate(interaction)
        .then(wasBotInteraction => {
            if (wasBotInteraction) {
                console.log(`${getGetTimestampString()} Bot interaction handled: ${interaction.customId}`)
            }
        })
        .catch(err => {
            console.error(`${getGetTimestampString()} Error due to interaction: ${interaction.customId}`, err)
        })
})

client.login(DISCORD_BOT_TOKEN)
