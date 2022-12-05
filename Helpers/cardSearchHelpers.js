const scry = require('scryfall-sdk')
const md5 = require('md5')
const NodeCache = require('node-cache')

const {CARDS_PER_PAGE} = require('../globalVars')
const {GAMETYPE_FILTER} = process.env

const cache = new NodeCache({stdTTL: 1800})


const searchCards = async (searchTerm, page = 1) => {
    const queryHash = md5(searchTerm)
    const cacheKey = `search___${queryHash}`
    return await searchCardsByHash(cacheKey, page, searchTerm)
}

const searchCardsByHash = async (queryHash, page = 1, searchTerm = null) => {
    const cacheKey = `search___${queryHash}`

    let cards = cache.get(cacheKey)

    if (!cards) {
        if (searchTerm) {
            cards = await scry.Cards.search(searchTerm, {unique: 'cards', order: 'usd'}).waitForAll()
            cards = cards.filter(card => card.games.includes(GAMETYPE_FILTER))
            cache.set(cacheKey, cards)
        } else {
            return {cards: [], totalPages: 0, totalCards: 0, queryHash: queryHash}
        }
    }

    const pagedCards = cards.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

    return {cards: pagedCards, totalCards: cards.length, totalPages: Math.ceil(cards.length / CARDS_PER_PAGE), queryHash: queryHash}
}

const lookupCardById = async (cardId) => {
    const cacheKey = `lookupById___${cardId}`

    let cachedCard = cache.get(cacheKey)

    if (!cachedCard) {
        cachedCard = await scry.Cards.byId(cardId)
        cachedCard.rulings = await cachedCard.getRulings()
        cache.set(cacheKey, cachedCard)
    }

    return cachedCard
}

const lookupCardByCard = async (card) => {
    const cacheKey = `lookupById___${card.id}`

    let cachedCard = cache.get(cacheKey)

    if (!cachedCard) {
        card.rulings = await card.getRulings()
        cache.set(cacheKey, card)
        return card
    }

    return cachedCard
}


module.exports = {
    searchCards,
    searchCardsByHash,
    lookupCardById,
    lookupCardByCard
}
