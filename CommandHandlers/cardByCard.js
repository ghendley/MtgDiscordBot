const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

const {getCardEmbeds} = require('../Helpers/cardFormattingHelpers')
const {searchCardsByHash, lookupCardByCard} = require('../Helpers/cardSearchHelpers')
const {updateInteractionMessageWithError} = require('../Helpers/errorResponseHelpers')
const {CARDS_PER_PAGE} = require('../globalVars')


const handleCardByCard = async (page, cardNum, queryHash, interaction) => {
    const {cards, totalPages} = await searchCardsByHash(queryHash, page)

    if (cards.length === 0 || totalPages === 0) {
        await updateInteractionMessageWithError(interaction, 'Caching error: please initiate new card search.')
        return;
    }

    const card = await lookupCardByCard(cards[cardNum - 1])
    const embeds = getCardEmbeds(card)

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'cbc', p: cardNum === 1 ? page - 1 : page, n: cardNum === 1 ? CARDS_PER_PAGE : cardNum - 1, q: queryHash}))
                .setLabel(`Back`)
                .setStyle(ButtonStyle.Primary)
                .setEmoji('⬅️')
                .setDisabled(cardNum === 1 && page === 1)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'cbc', p: cardNum === CARDS_PER_PAGE ? page + 1 : page, n: cardNum === CARDS_PER_PAGE ? 1 : cardNum + 1, q: queryHash}))
                .setLabel(`Next`)
                .setStyle(ButtonStyle.Primary)
                .setEmoji('➡️')
                .setDisabled(cardNum === cards.length && page === totalPages)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(JSON.stringify({type: 'nav', p: page, q: queryHash}))
                .setLabel(`Search List`)
                .setStyle(ButtonStyle.Success)
                .setEmoji('🔍')
        )

    await interaction.update({
        content: '',
        embeds: embeds,
        components: [row]
    })
}


module.exports = handleCardByCard
