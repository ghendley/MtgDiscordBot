const _ = require('lodash')
const crypto = require('crypto')
const {EmbedBuilder} = require('discord.js')
const {KEYWORDS_WIKI_URL} = require('../globalVars')

const {FORMAT_FILTER, EMOJI_WHITEMANA, EMOJI_BLUEMANA, EMOJI_BLACKMANA, EMOJI_REDMANA, EMOJI_GREENMANA, EMOJI_TAP} = process.env


const formats = FORMAT_FILTER.toLowerCase().split(',')

const replaceSymbols = (text) => {
    const symbolEmojis = {
        'W': EMOJI_WHITEMANA,
        'U': EMOJI_BLUEMANA,
        'B': EMOJI_BLACKMANA,
        'R': EMOJI_REDMANA,
        'G': EMOJI_GREENMANA,
        'W/P': `(${EMOJI_WHITEMANA}/🅿️)`,
        'U/P': `(${EMOJI_BLUEMANA}/🅿️)`,
        'B/P': `(${EMOJI_BLACKMANA}/🅿️)`,
        'R/P': `(${EMOJI_REDMANA}/🅿️)`,
        'G/P': `(${EMOJI_GREENMANA}/🅿️)`,
        'T': EMOJI_TAP,
        'S': '❄️',
        'C': ':one:',
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '10': ':one::zero:',
        '11': ':one::one:',
        '12': ':one::two:',
        '13': ':one::three:',
        '14': ':one::four:',
        '15': ':one::five:',
        '16': ':one::six:',
        '17': ':one::seven:',
        '18': ':one::eight:',
        '19': ':one::nine:',
        '20': ':two::zero:',
        '100': ':one::zero::zero:'
    }
    return _.replace(text, /{([^}]+)}/g, (match, p1) => symbolEmojis[p1] ?? match)
}

// TODO BACKLOG hover text for keywords (scrape and store in a db?)
const replaceKeywords = (text, keywords) => {
    for (const keyword of keywords) {
        text = _.replace(text, keyword, `[${keyword}](${KEYWORDS_WIKI_URL}#${_.replace(_.startCase(keyword), ' ', '_')} "${keyword} on wiki")`)
    }
    return text
}

// TODO This could use a refactor for readability
// TODO Handle variations search (frame effect, set, finish)
// TODO Dual-faced cards in same embed, use small images -- If image has same URL, use one (normal-sized) image
// TODO Handle different legalities (restricted) with extra text
// TODO setColor to color identity (average of color identities?)
const getCardEmbed = (card) => {
    const uuid = crypto.randomUUID().substring(0, 8)
    const title = `${card.name} ${card.mana_cost === '' ? '' : '  ' + replaceSymbols(card.mana_cost)}`
    const oracleText = replaceKeywords(replaceSymbols(card.oracle_text), card.keywords)
    const legalities = _.keysIn(_.pickBy(card.legalities, legality => legality === 'legal'))
        .filter(format => formats.includes(format))
        .map(format => _.startCase(format))
        .sort()
        .join(' | ')

    let rulingsHover = card.rulings
        .map(ruling => `${ruling.source} - ${ruling.published_at} - ${ruling.comment}`)
        .join('\n\n')
    let rulingsValue = `[${card.rulings.length} Rulings](${card.scryfall_uri}#rulings "${rulingsHover}")`
    if (rulingsValue.length > 1024) {
        rulingsValue = rulingsValue.substring(0, 1019) + '...")'
    }

    let price = ''
    if (card.prices.usd) {
        price += `**$${card.prices.usd}**\n`
    }
    if (card.prices.usd_foil) {
        if (!card.prices.usd) {
            price += `**$${card.prices.usd_foil}** *Foil*\n`
        } else {
            price += `$${card.prices.usd_foil} *Foil*\n`
        }
    }
    if (card.prices.usd_etched) {
        if (!card.prices.usd && !card.prices.usd_foil) {
            price += `**$${card.prices.usd_etched}** *Etched*`
        } else {
            price += `$${card.prices.usd_etched} *Etched*`
        }
    }
    price = price.trim()
    if (price === '') {
        price = 'N/A'
    }

    const footerText = `Legal:\t${legalities}`

    const embed = new EmbedBuilder()

    embed.setURL(card.scryfall_uri + `&uuid=${uuid}`)
    embed.setTitle(title)
    embed.setDescription(`[${card.set_name}](${card.scryfall_set_uri})`)
    embed.setImage(card.image_uris.normal)

    embed.addFields({
        name: `${card.type_line}\t${card.power && card.toughness ? '**' + card.power + ' / ' + card.toughness + '**' : ''}`,
        value: !oracleText ? '*(No oracle text)*' : oracleText,
        inline: false
    })
    embed.addFields(
        {name: 'Price', value: price, inline: true},
        {name: 'Rarity', value: _.capitalize(card.rarity), inline: true},
        {name: 'Rulings', value: rulingsValue, inline: true}
    )

    embed.setFooter({text: footerText})

    return embed
}

// TODO Two-sided cards on same embed (?)
const getCardEmbeds = (card) => {
    if (card.card_faces.length > 1) {
        return card.card_faces.map(face => {
            const decoratedFace = face
            decoratedFace.rulings = card.rulings
            return getCardEmbed(decoratedFace)
        })
    }

    return [getCardEmbed(card)]
}


module.exports = {
    getCardEmbeds
}
